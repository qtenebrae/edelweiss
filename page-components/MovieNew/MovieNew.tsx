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
import { MovieNewProps } from './MovieNew.props';
import style from './MovieNew.module.css';
import cn from 'classnames';
import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { CalendarIcon, GATEWAY_HOST } from '@/constants';
import { Type, Status, Genre, Country } from '@/components';
import { ICountry, IGenre, IStatus, IType } from '@/interfaces';
import { parseDate, getLocalTimeZone } from '@internationalized/date';
import axios from 'axios';
import { toast } from 'react-toastify';

export const MovieNew = ({ ...props }: MovieNewProps) => {
	const genres_added: IGenre[] = [];
	const countries_added: ICountry[] = [];

	const [types, setTypes] = useState<IType[]>([]);
	const [statuses, setStatuses] = useState<IStatus[]>([]);
	const [genres, setGenres] = useState<IGenre[]>([]);
	const [countries, setCountries] = useState<ICountry[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [types, statuses, genres, countries] = await Promise.all([
					axios.get(`http://${GATEWAY_HOST}/catalog/type/findAll`),
					axios.get(`http://${GATEWAY_HOST}/catalog/status/findAll`),
					axios.get(`http://${GATEWAY_HOST}/catalog/genre/findAll`),
					axios.get(`http://${GATEWAY_HOST}/catalog/country/findAll`),
				]);
				setTypes(types.data);
				setStatuses(statuses.data);
				setGenres(genres.data);
				setCountries(countries.data);
			} catch {
				//
			}
		};
		fetchData();
	}, []);

	const [title, setTitle] = useState<string>();
	const [alternativeTitle, setAlternativeTile] = useState<string>();
	const [typeId, setTypeId] = useState<string>();
	const [statusId, setStatusId] = useState<string>();
	const [duration, setDuration] = useState<string>();
	const [numberOfEpisodes, setNumberOfEpisodes] = useState<string>();
	const [release, setRelease] = useState<CalendarDate>(parseDate('2024-04-04'));
	const [ageLimit, setAgeLimit] = useState<string>();
	const [description, setDescription] = useState<string>();

	const handleSelectionStatus = (e: ChangeEvent<HTMLSelectElement>) => {
		setStatusId(e.target.value);
	};

	const handleSelectionType = (e: ChangeEvent<HTMLSelectElement>) => {
		setTypeId(e.target.value);
	};

	const createMovie = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			await axios.post(`http://${GATEWAY_HOST}/catalog/movie/create`, {
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
				posterUrl: 'wa',
			});

			toast.success('Кинопроивзедение добавлено!');
		} catch (error) {
			toast.error('Произошла ошибка!');
		}
	};

	return (
		<form className={style.wrapper} {...props} method="POST" onSubmit={createMovie}>
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

			<Breadcrumbs className={style.breadcrumbs}>
				<BreadcrumbItem href="/">Главная</BreadcrumbItem>
				<BreadcrumbItem href="">Кинопроизведения</BreadcrumbItem>
			</Breadcrumbs>

			<Image
				className={cn(style.poster, 'object-cover w-[200px] h-[300px]')}
				classNames={{ wrapper: 'w-[200px] h-[300px]' }}
				src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
			/>

			<div className={cn(style.information, 'text-[14px]')}>
				<Chip variant="shadow" className="block max-w-full text-[18px] bg-secondary-200/70">
					Информация
				</Chip>

				<Select
					radius="md"
					label="Тип"
					selectedKeys={typeId}
					onChange={handleSelectionType}
					isRequired
				>
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

				<Select
					radius="md"
					label="Статус"
					selectedKeys={statusId}
					onChange={handleSelectionStatus}
					isRequired
				>
					{statuses.map((item) => (
						<SelectItem key={item.id}>{item.title}</SelectItem>
					))}
				</Select>

				<DateInput
					label={'Дата выхода'}
					className="max-w-full"
					startContent={
						<CalendarIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
					}
					value={release}
					onChange={setRelease}
					isRequired
				/>

				<div className="font-bold">
					Жанры:
					{genres_added.map((genre) => (
						<Chip key={genre.id} size="sm" className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md">
							{genre.title}
						</Chip>
					))}
					<Chip
						size="sm"
						className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:bg-secondary-200 hover:text-secondary transition"
					>
						Добавить
					</Chip>
				</div>

				<div className="font-bold">
					Страны производства:
					{countries_added.map((country) => (
						<Chip
							key={country.id}
							size="sm"
							className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md"
						>
							{country.title}
						</Chip>
					))}
					<Chip
						size="sm"
						className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md cursor-pointer hover:bg-secondary-200 hover:text-secondary transition"
					>
						Добавить
					</Chip>
				</div>

				<Input
					type="number"
					label="Возрастное ограничение"
					value={ageLimit}
					onValueChange={setAgeLimit}
					isRequired
				></Input>
			</div>

			<div className={style.actions}>
				<Chip variant="shadow" className="block max-w-full text-[18px] bg-secondary-200/70">
					Действия
				</Chip>

				<Popover placement="right">
					<PopoverTrigger>
						<Button color="secondary" variant="flat" className="w-max-full w-full">
							Тип кинопроизведения
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Type types={types} setTypes={setTypes}></Type>
					</PopoverContent>
				</Popover>

				<Popover placement="right">
					<PopoverTrigger>
						<Button color="secondary" variant="flat" className="w-max-full w-full">
							Статус кинопроизведения
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Status statuses={statuses} setStatuses={setStatuses}></Status>
					</PopoverContent>
				</Popover>

				<Popover placement="right">
					<PopoverTrigger>
						<Button color="secondary" variant="flat" className="w-max-full w-full">
							Жанр кинопроизведения
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Genre genres={genres} setGenres={setGenres}></Genre>
					</PopoverContent>
				</Popover>

				<Popover placement="right">
					<PopoverTrigger>
						<Button color="secondary" variant="flat" className="w-max-full w-full">
							Страна производства
						</Button>
					</PopoverTrigger>
					<PopoverContent className="p-[20px] gap-[10px]">
						<Country countries={countries} setCountries={setCountries}></Country>
					</PopoverContent>
				</Popover>

				<Button color="secondary" variant="flat" className="w-max-full w-full" type="submit">
					Добавить фильм
				</Button>
			</div>

			<div className={style.description}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] mb-[10px] bg-secondary-200/70"
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

			<div className={style.participants}>
				<Chip
					variant="shadow"
					className="block max-w-full mb-[10px] text-[18px] bg-secondary-200/70"
				>
					Авторы
				</Chip>

				<div className={style.participantsgrid}>
					{statuses.map(() => (
						<div className={style.participant}>
							<Image
								className={cn(style.pass, 'object-cover w-[60px] h-[90px]')}
								src="https://app.requestly.io/delay/5/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
							/>

							<div>
								Райан Госуслуги
								<div className="font-bold">
									Роль:
									<Chip size="sm" className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md">
										Режиссер
									</Chip>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>

			<div className={style.participants}>
				<Chip
					variant="shadow"
					className="block max-w-full mb-[10px] text-[18px] bg-secondary-200/70"
				>
					Персонажи
				</Chip>

				<div className={style.participantsgrid}>
					{statuses.map(() => (
						<div className={style.participant}>
							<Image
								className={cn(style.pass, 'object-cover w-[60px] h-[90px]')}
								src="https://app.requestly.io/delay/5/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
							/>

							<div>
								Райан Госуслуги
								<div className="font-bold">
									Актер:
									<Chip size="sm" className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md">
										Режиссер
									</Chip>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		</form>
	);
};
