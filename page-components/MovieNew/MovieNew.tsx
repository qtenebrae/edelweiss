import { MovieNewProps } from './MovieNew.props';
import {
	Breadcrumbs,
	BreadcrumbItem,
	Chip,
	Image,
	Select,
	SelectItem,
	Input,
	Textarea,
	DateInput,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	CalendarDate,
} from '@nextui-org/react';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { Type, Status, Genre, Country, Profession, Person } from '@/components';
import { ICountry, IGenre, IPerson, IProfession, IStatus, IType } from '@/interfaces';
import { CalendarIcon, CloseIcon, GATEWAY_HOST } from '@/constants';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import { toast } from 'react-toastify';
import style from './MovieNew.module.css';
import cn from 'classnames';
import axios from 'axios';

interface Participant {
	character?: string;
	professionId: number;
	movieId: number;
	personId: number;
	person: IPerson;
}

export const MovieNew = ({ ...props }: MovieNewProps) => {
	// Genres, countries of production and cinema workers that will be added along with the new film
	const [genresAdded, setGenresAdded] = useState<IGenre[]>([]);
	const [countriesAdded, setCountriesAdded] = useState<ICountry[]>([]);
	const [participantsAdded, setParticipantsAdded] = useState<Participant[]>([]);

	// A profession that will be added for the next film worker
	const [selectProfession, setSelectProfession] = useState<string>();

	// The data that will be uploaded to the page
	const [types, setTypes] = useState<IType[]>([]);
	const [statuses, setStatuses] = useState<IStatus[]>([]);
	const [genres, setGenres] = useState<IGenre[]>([]);
	const [countries, setCountries] = useState<ICountry[]>([]);
	const [professions, setProfessions] = useState<IProfession[]>([]);
	const [persons, setPersons] = useState<IPerson[]>([]);

	// Preview for the movie poster and the poster itself
	const [poster, setPoster] = useState<File | null>(null);
	const [posterPreview, setPosterPreview] = useState<string | null>(null);

	// Fetching data from the server
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [types, statuses, genres, countries, professions, persons] = await Promise.all([
					axios.get(`http://${GATEWAY_HOST}/catalog/type/findAll`),
					axios.get(`http://${GATEWAY_HOST}/catalog/status/findAll`),
					axios.get(`http://${GATEWAY_HOST}/catalog/genre/findAll`),
					axios.get(`http://${GATEWAY_HOST}/catalog/country/findAll`),
					axios.get(`http://${GATEWAY_HOST}/catalog/profession/findAll`),
					axios.get(`http://${GATEWAY_HOST}/catalog/person/findAll`),
				]);
				setTypes(types.data);
				setStatuses(statuses.data);
				setGenres(genres.data);
				setCountries(countries.data);
				setProfessions(professions.data);
				setPersons(persons.data);
			} catch {
				//
			}
		};
		fetchData();
	}, []);

	// The data that will be saved in the new movie
	const [title, setTitle] = useState<string>();
	const [alternativeTitle, setAlternativeTile] = useState<string>();
	const [typeId, setTypeId] = useState<string>();
	const [statusId, setStatusId] = useState<string>();
	const [duration, setDuration] = useState<string>();
	const [numberOfEpisodes, setNumberOfEpisodes] = useState<string>();
	const [release, setRelease] = useState<CalendarDate>(parseDate('2001-01-01'));
	const [ageLimit, setAgeLimit] = useState<string>();
	const [description, setDescription] = useState<string>();

	// Handlers for select components
	const handleSelectionStatus = (e: ChangeEvent<HTMLSelectElement>) => {
		setStatusId(e.target.value);
	};

	const handleSelectionType = (e: ChangeEvent<HTMLSelectElement>) => {
		setTypeId(e.target.value);
	};

	const handleSelectionProfession = (p: ChangeEvent<HTMLSelectElement>) => {
		setSelectProfession(p.target.value);
	};

	// Request to add a new movie to the server
	const createMovie = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		let filename = '';

		// Saving the poster to the server
		if (poster) {
			const formData = new FormData();
			formData.append('poster', poster);

			try {
				const response = await axios.post(
					`http://${GATEWAY_HOST}/catalog/movie/uploadPoster`,
					formData,
					{
						headers: {
							'Content-Type': 'multipart/form-data',
						},
					},
				);

				filename = response.data.filename;
			} catch (error) {
				//
			}
		}

		// Adding a movie
		try {
			const response = await axios.post(`http://${GATEWAY_HOST}/catalog/movie/create`, {
				title,
				alternativeTitle,
				typeId: Number(typeId),
				statusId: Number(statusId),
				duration: Number(duration),
				numberOfEpisodes: Number(numberOfEpisodes),
				release: release.toDate(getLocalTimeZone()),
				ageLimit: Number(ageLimit),
				description,
				rating: 0,
				posterUrl: filename,
				genresId: genresAdded.map((item) => item.id),
				countriesId: countriesAdded.map((item) => item.id),
				participants: participantsAdded,
			});

			console.log(response.data);

			toast.success('Кинопроивзедение добавлено!');
		} catch (error) {
			toast.error('Ошибка добавления!');
		}
	};

	// Handlers for adding genres, countries of production and film workers
	const handleAddGenre = (genre: IGenre) => {
		if (!genresAdded.some((g) => g.id === genre.id)) {
			setGenresAdded((prevGenres) => [...prevGenres, genre]);
		}
	};

	const handleAddCountry = (country: ICountry) => {
		if (!countriesAdded.some((c) => c.id === country.id)) {
			setCountriesAdded((prevCountries) => [...prevCountries, country]);
		}
	};

	const handleAddWorkers = (person: IPerson) => {
		const newParticipant: Participant = {
			professionId: Number(selectProfession),
			movieId: 1,
			personId: person.id,
			person: person,
		};
		setParticipantsAdded((prevParticipants) => [...prevParticipants, newParticipant]);
	};

	// Handlers for removing genres, countries of production and film workers
	const handleRemoveGenre = (genre: IGenre) => {
		setGenresAdded((prevGenres) => prevGenres.filter((g) => g.id !== genre.id));
	};

	const handleRemoveCountry = (country: ICountry) => {
		setCountriesAdded((prevCountries) => prevCountries.filter((c) => c.id !== country.id));
	};

	// Replacing the poster preview
	const handlePosterChange = (event: ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setPoster(file);
			setPosterPreview(URL.createObjectURL(file));
		}
	};

	return (
		<form className={style.wrapper} method="POST" onSubmit={createMovie} {...props}>
			{/* The title and alternative titles of the film */}
			<div className={style.title}>
				<Input
					type="text"
					label="Название"
					value={title}
					onValueChange={setTitle}
					isRequired
				></Input>

				<Input
					type="text"
					label="Альтернативное название"
					value={alternativeTitle}
					onValueChange={setAlternativeTile}
					isRequired
				></Input>
			</div>
			{/* Breadcrumbs */}
			<Breadcrumbs className={style.breadcrumbs}>
				<BreadcrumbItem href="/">Главная</BreadcrumbItem>
				<BreadcrumbItem href="">Фильмы</BreadcrumbItem>
			</Breadcrumbs>
			{/* The poster */}
			<div className={style.poster}>
				<label htmlFor="poster">
					<Image
						className="object-cover w-[200px] h-[300px]"
						classNames={{ wrapper: 'w-[200px] h-[300px]' }}
						src={posterPreview ? posterPreview : `http://${GATEWAY_HOST}/uploads/404.jpg`}
					/>
				</label>

				<label htmlFor="poster">
					<Chip className="w-[200px] mt-[10px] max-w-full text-default-900 bg-gradient-to-tr from-secondary-200 to-primary-100 shadow-lg">
						Добавить файл
					</Chip>
				</label>

				<input
					id="poster"
					type="file"
					accept="image/*"
					onChange={handlePosterChange}
					className="hidden"
				/>
			</div>
			{/* A block with information */}
			<div className={cn(style.information, 'text-[14px]')}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Информация
				</Chip>

				<Select label="Тип" selectedKeys={typeId} onChange={handleSelectionType} isRequired>
					{types.map((item) => (
						<SelectItem key={item.id}>{item.title}</SelectItem>
					))}
				</Select>

				<Input
					type="number"
					label="Эпизоды"
					value={numberOfEpisodes}
					onValueChange={setNumberOfEpisodes}
					isRequired
					startContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-default-400 text-small">N</span>
						</div>
					}
				></Input>

				<Input
					type="number"
					label="Длительность эпизода"
					value={duration}
					onValueChange={setDuration}
					isRequired
					endContent={
						<div className="pointer-events-none flex items-center">
							<span className="text-default-400 text-small">мин</span>
						</div>
					}
				></Input>

				<Select label="Статус" selectedKeys={statusId} onChange={handleSelectionStatus} isRequired>
					{statuses.map((item) => (
						<SelectItem key={item.id}>{item.title}</SelectItem>
					))}
				</Select>

				<DateInput
					label="Дата выхода"
					startContent={
						<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
					}
					value={release}
					onChange={setRelease}
					isRequired
				/>

				<div className="font-bold">
					Жанры:
					{genresAdded.map((genre) => (
						<Chip
							key={genre.id}
							size="sm"
							className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:text-secondary transition"
							onClick={() => handleRemoveGenre(genre)}
							endContent={<CloseIcon className="w-[16px] h-[16px] stroke-default-500" />}
						>
							{genre.title}
						</Chip>
					))}
					<Popover placement="right">
						<PopoverTrigger>
							<Chip
								size="sm"
								className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:text-secondary transition"
							>
								Добавить
							</Chip>
						</PopoverTrigger>
						<PopoverContent className="p-[20px] gap-[10px] w-[360px] h-[200px]">
							<div>
								{genres.map((genre) => (
									<Chip
										size="sm"
										className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:text-secondary transition"
										key={genre.id}
										onClick={() => handleAddGenre(genre)}
									>
										{genre.title}
									</Chip>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</div>

				<div className="font-bold">
					Страны производства:
					{countriesAdded.map((country) => (
						<Chip
							key={country.id}
							size="sm"
							className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:bg-secondary-200 hover:text-secondary transition"
							onClick={() => handleRemoveCountry(country)}
							endContent={<CloseIcon className="w-[16px] h-[16px] stroke-default-500" />}
						>
							{country.title}
						</Chip>
					))}
					<Popover placement="right">
						<PopoverTrigger>
							<Chip
								size="sm"
								className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:text-secondary transition"
							>
								Добавить
							</Chip>
						</PopoverTrigger>
						<PopoverContent className="p-[20px] gap-[10px] w-[360px] h-[200px]">
							<div>
								{countries.map((country) => (
									<Chip
										size="sm"
										className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:text-secondary transition"
										key={country.id}
										onClick={() => handleAddCountry(country)}
									>
										{country.title}
									</Chip>
								))}
							</div>
						</PopoverContent>
					</Popover>
				</div>

				<Input
					type="number"
					label="Возрастное ограничение"
					value={ageLimit}
					onValueChange={setAgeLimit}
					isRequired
				></Input>
			</div>
			{/* Actions */}
			<div className={style.actions}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Действия
				</Chip>

				<Popover placement="right">
					<PopoverTrigger>
						<Button
							color="secondary"
							variant="flat"
							className="w-max-full w-full bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900 shadow-lg"
						>
							Тип кинопроизведения
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Type types={types} setTypes={setTypes}></Type>
					</PopoverContent>
				</Popover>

				<Popover placement="right">
					<PopoverTrigger>
						<Button
							color="secondary"
							variant="flat"
							className="w-max-full w-full bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900 shadow-lg"
						>
							Статус кинопроизведения
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Status statuses={statuses} setStatuses={setStatuses}></Status>
					</PopoverContent>
				</Popover>

				<Popover placement="right">
					<PopoverTrigger>
						<Button
							color="secondary"
							variant="flat"
							className="w-max-full w-full bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900 shadow-lg"
						>
							Жанр кинопроизведения
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Genre genres={genres} setGenres={setGenres}></Genre>
					</PopoverContent>
				</Popover>

				<Popover placement="right">
					<PopoverTrigger>
						<Button
							color="secondary"
							variant="flat"
							className="w-max-full w-full bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900 shadow-lg"
						>
							Страна производства
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Country countries={countries} setCountries={setCountries}></Country>
					</PopoverContent>
				</Popover>

				<Button
					color="success"
					variant="flat"
					className="w-max-full w-full shadow-lg"
					type="submit"
				>
					Добавить фильм
				</Button>
			</div>
			{/* Actions with cinema workers */}
			<div className={style.participantActions}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900"
				>
					Работники кино
				</Chip>

				<Popover placement="right">
					<PopoverTrigger>
						<Button
							color="secondary"
							variant="flat"
							className="w-max-full w-full bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900 shadow-lg"
						>
							Профессии
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Profession professions={professions} setProfessions={setProfessions}></Profession>
					</PopoverContent>
				</Popover>

				<Popover placement="right">
					<PopoverTrigger>
						<Button
							color="secondary"
							variant="flat"
							className="w-max-full w-full bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900 shadow-lg"
						>
							Работники кино
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Person persons={persons} setPersons={setPersons}></Person>
					</PopoverContent>
				</Popover>
			</div>
			{/* Description */}
			<div className={style.description}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] mb-[10px] bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900"
				>
					Описание
				</Chip>

				<Textarea
					label="Описание"
					className="flex max-w-full"
					value={description}
					onValueChange={setDescription}
					isRequired
				/>
			</div>
			{/* Cinema workers */}
			<div className={style.participants}>
				<Chip
					variant="shadow"
					className="block max-w-full mb-[10px] text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100 text-default-900"
				>
					Работники кино
				</Chip>

				<div className={style.participantsgrid}>
					{participantsAdded.map((item) => (
						<div className={style.participant}>
							<Image
								className={cn(style.pass, 'object-cover w-[60px] h-[90px]')}
								src={
									item.person.photoUrl
										? `http://${GATEWAY_HOST}/uploads/${item.person.photoUrl}`
										: `http://${GATEWAY_HOST}/uploads/404.jpg`
								}
							/>

							<div>
								{`${item.person.lastname} ${item.person.firstname}`}
								<div className="font-bold">
									Роль:
									<Chip
										size="sm"
										className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:bg-secondary-200 hover:text-secondary transition"
									>
										{professions.find((profession) => profession.id === item.professionId)?.title}
									</Chip>
								</div>
							</div>
						</div>
					))}

					<div>
						<Popover placement="right">
							<PopoverTrigger>
								<Chip
									size="sm"
									className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:text-secondary transition"
								>
									Добавить
								</Chip>
							</PopoverTrigger>
							<PopoverContent className="p-[20px] gap-[10px] w-[360px] h-[200px]">
								<div>
									{persons.map((person) => (
										<div className="flex" key={person.id}>
											<Image
												className={cn(style.pass, 'object-cover w-[60px] h-[90px]')}
												src={
													person.photoUrl
														? `http://${GATEWAY_HOST}/uploads/${person.photoUrl}`
														: `http://${GATEWAY_HOST}/uploads/404.jpg`
												}
											/>
											<Chip
												size="sm"
												className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:text-secondary transition"
												onClick={() => handleAddWorkers(person)}
											>
												{`${person.lastname} ${person.firstname} ${person.middlename}`}
											</Chip>
										</div>
									))}
								</div>
							</PopoverContent>
						</Popover>

						<Select
							label="Статус"
							selectedKeys={selectProfession}
							onChange={handleSelectionProfession}
							className="mt-[10px] ml-[5px]"
							classNames={{
								trigger:
									'bg-gradient-to-tr from-secondary-200 to-primary-100 w-[140px] h-[40px] min-h-0',
							}}
						>
							{professions.map((item) => (
								<SelectItem key={item.id}>{item.title}</SelectItem>
							))}
						</Select>
					</div>
				</div>
			</div>
		</form>
	);
};
