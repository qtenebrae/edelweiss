import { Breadcrumbs, BreadcrumbItem, Chip, Image, Select, SelectItem } from '@nextui-org/react';
import { MovieProps } from './Movie.props';
import style from './Movie.module.css';
import cn from 'classnames';
import moment from 'moment';
import { Rating } from '@/components/Rating/Rating';
import { ChangeEvent, useContext, useEffect, useState } from 'react';
import { movieRatings } from './constants';
import { GATEWAY_HOST, StarIcon } from '@/constants';
import { ICategory, IHistory } from '@/interfaces';
import { useRouter } from 'next/router';
import { AuthContext } from '@/context/auth.context';
import axios from 'axios';

const scores = [
	{
		title: '10',
		value: 5,
	},
	{
		title: '9',
		value: 0,
	},
	{
		title: '8',
		value: 7,
	},
	{
		title: '6',
		value: 2,
	},
	{
		title: '5',
		value: 0,
	},
	{
		title: '4',
		value: 0,
	},
	{
		title: '3',
		value: 0,
	},
	{
		title: '2',
		value: 0,
	},
	{
		title: '1',
		value: 0,
	},
];

const all = 14;

const distribution = (score: number, all: number) => {
	return (score * 100) / all;
};

export const Movie = ({ movie, ...props }: MovieProps) => {
	const { isAuth } = useContext(AuthContext);
	const [rating, setRating] = useState<number>(0);

	const router = useRouter();
	const { id: movieId } = router.query;

	const [categories, setCategories] = useState<ICategory[]>([]);
	const [userHistory, setUserHistory] = useState<IHistory | null>(null);

	// Fetching data from the server
	useEffect(() => {
		const fetchData = async () => {
			try {
				const [categories] = await Promise.all([
					axios.get(`http://${GATEWAY_HOST}/feedback/category/findAll`),
				]);
				setCategories(categories.data);

				if (isAuth) {
					const history = await axios.post<IHistory[]>(
						`http://${GATEWAY_HOST}/feedback/history/findWhere`,
						{
							authorId: isAuth.id,
							movieId,
						},
					);
					setUserHistory(history.data[0]);

					if (history.data[0]) {
						setCategoryId(`${history.data[0].categoryId}`);
						setRating(history.data[0].score);
					}
				}
			} catch {
				//
			}
		};
		fetchData();
	}, [isAuth]);

	const [categoryId, setCategoryId] = useState<string>();

	const handleSelectionCategory = async (c: ChangeEvent<HTMLSelectElement>) => {
		setCategoryId(c.target.value);
		if (isAuth) {
			const history = await axios.post<IHistory[]>(
				`http://${GATEWAY_HOST}/feedback/history/findWhere`,
				{
					authorId: isAuth.id,
					movieId,
				},
			);

			if (history.data[0]) {
				history.data[0].categoryId = Number(c.target.value);

				const newHistory = await axios.put<IHistory>(
					`http://${GATEWAY_HOST}/feedback/history/update`,
					history.data[0],
				);
				setUserHistory(newHistory.data);
				return;
			}

			const newHistory = await axios.post<IHistory>(
				`http://${GATEWAY_HOST}/feedback/history/create`,
				{ movieId: Number(movieId), authorId: isAuth.id, categoryId: Number(c.target.value) },
			);
			setUserHistory(newHistory.data);
		}
	};

	const handleUpdateEpisodes = async () => {
		if (isAuth) {
			const history = await axios.post<IHistory[]>(
				`http://${GATEWAY_HOST}/feedback/history/findWhere`,
				{
					authorId: isAuth.id,
					movieId,
				},
			);

			if (history.data[0] && history.data[0].numberOfEpisodes < movie.numberOfEpisodes) {
				history.data[0].numberOfEpisodes++;
				const newHistory = await axios.put<IHistory>(
					`http://${GATEWAY_HOST}/feedback/history/update`,
					history.data[0],
				);
				setUserHistory(newHistory.data);
			}
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			if (isAuth) {
				const history = await axios.post<IHistory[]>(
					`http://${GATEWAY_HOST}/feedback/history/findWhere`,
					{
						authorId: isAuth.id,
						movieId,
					},
				);

				if (history.data[0] && rating !== history.data[0].score) {
					history.data[0].score = rating;

					const newHistory = await axios.put<IHistory>(
						`http://${GATEWAY_HOST}/feedback/history/update`,
						history.data[0],
					);
					setUserHistory(newHistory.data);
					return;
				}

				if (!history.data[0] && rating != 0) {
					const newHistory = await axios.post<IHistory>(
						`http://${GATEWAY_HOST}/feedback/history/create`,
						{ movieId: Number(movieId), authorId: isAuth.id, categoryId: 7, score: rating },
					);
					setUserHistory(newHistory.data);
				}
			}
		};
		fetchData();
	}, [rating]);

	return (
		<div className={style.wrapper} {...props}>
			{/* The title and alternative titles of the film */}
			<h2 className={cn(style.title, 'text-[28px]')}>
				{movie.title} / {movie.alternativeTitle}
			</h2>
			{/* Breadcrumbs */}
			<Breadcrumbs className={style.breadcrumbs}>
				<BreadcrumbItem href="/">Главная</BreadcrumbItem>
				<BreadcrumbItem href="">Фильмы</BreadcrumbItem>
			</Breadcrumbs>
			{/* The poster */}
			<Image
				className={cn(style.poster, 'object-cover w-[200px] h-[300px]')}
				classNames={{ wrapper: 'w-[200px] h-[300px]' }}
				src={`http://${GATEWAY_HOST}/uploads/${movie.posterUrl}`}
			/>
			{/* A block with information */}
			<div className={cn(style.information, 'text-[14px]')}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Информация
				</Chip>

				<div className="font-bold">
					Тип:
					<span className="font-normal ml-[5px] text-default-500">{`${movie.type.title}`}</span>
				</div>

				<div className="font-bold">
					Эпизоды:
					<span className="font-normal ml-[5px] text-default-500">{`${movie.numberOfEpisodes}`}</span>
				</div>

				<div className="font-bold">
					Длительность эпизода:
					<span className="font-normal ml-[5px] text-default-500">{`${movie.duration}`} мин.</span>
				</div>

				<div className="font-bold">
					Статус:
					<span className="font-normal ml-[5px] text-default-500">{`${movie.status.title}`}</span>
				</div>

				<div className="font-bold">
					Дата выхода:
					<span className="font-normal ml-[5px] text-default-500">{`${moment(movie.release).format(
						'DD/MM/YYYY',
					)}`}</span>
				</div>

				<div className="font-bold">
					Жанры:
					{movie.genres.map((genre) => (
						<Chip
							key={genre.genreId}
							size="sm"
							className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md hover:from-secondary-300 hover:to-primary-200"
						>
							{genre.genre.title}
						</Chip>
					))}
				</div>

				<div className="font-bold">
					Страны производства:
					{movie.countries.map((country) => (
						<Chip
							key={country.countryId}
							size="sm"
							className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md hover:from-secondary-300 hover:to-primary-200"
						>
							{country.country.title}
						</Chip>
					))}
				</div>

				<div className="font-bold">
					Возрастное ограничение:
					<span className="font-normal ml-[5px] text-default-500">{`${movie.ageLimit}+`}</span>
				</div>
			</div>
			{/* A block with a movie rating */}
			<div className={style.rating}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Рейтинг
				</Chip>

				<div className="flex justify-center mt-[10px]">
					<Rating rating={Math.round(movie.rating)}></Rating>
				</div>

				{movie.rating != null && movie.rating != 0 && (
					<div className="text-[48px] font-bold text-center text-default-500">{movie.rating}</div>
				)}

				{movie.rating != null && movie.rating != 0 && (
					<div className="text-center text-default-500">
						{movieRatings[Math.round(movie.rating)]}
					</div>
				)}

				{movie.rating == null ||
					(movie.rating == 0 && (
						<div className="text-center text-default-500 mt-[10px]">Нет оценок</div>
					))}
			</div>
			{/* The block with the distribution of ratings */}
			<div className={style.score}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] mb-[10px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Оценки людей
				</Chip>

				<div className={style.distribution}>
					{scores.map((item) => {
						if (item.value != 0)
							return (
								<div className={style.distributionItem}>
									<div className="justify-self-center">{item.title}</div>
									<StarIcon className="w-[20px] h-[20px] fill-secondary-200" />
									<div
										className="block bg-gradient-to-tr from-secondary-100 to-primary-50 w-[100px] ml-[10px] rounded-[20px] text-center"
										style={{ width: `${distribution(item.value, all)}%` }}
									>
										{item.value}
									</div>
								</div>
							);
					})}
				</div>
			</div>
			{/* Actions for the user */}
			<div className={style.userrating}>
				<Select
					radius="md"
					color="secondary"
					placeholder="Добавить в список"
					className="mb-[10px]"
					classNames={{
						value: 'text-default-900',
						trigger:
							'h-[32px] min-h-0 shadow-lg bg-gradient-to-tr from-secondary-200 to-primary-100',
					}}
					selectedKeys={categoryId}
					onChange={handleSelectionCategory}
				>
					{categories.map((item) => (
						<SelectItem key={item.id}>{item.title}</SelectItem>
					))}
				</Select>

				{userHistory && (
					<div className="flex justify-between mt-[10px] mb-[10px]">
						<div>Эпизоды</div>
						<div>
							{`${userHistory?.numberOfEpisodes}/${movie.numberOfEpisodes}`}{' '}
							<button onClick={handleUpdateEpisodes}>+</button>
						</div>
					</div>
				)}

				<Rating isEditable rating={rating} setRating={setRating}></Rating>

				{rating != null && rating != 0 && (
					<div className="text-[48px] font-bold text-center text-default-500">{rating}</div>
				)}

				{rating != null && rating != 0 && (
					<div className="text-center text-default-500">{movieRatings[rating]}</div>
				)}

				{rating == null ||
					(rating == 0 && <div className="text-center text-default-500 mt-[10px]">Не оценено</div>)}
			</div>
			{/* Description of the film */}
			<div className={style.description}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] mb-[10px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Описание
				</Chip>

				<div>{movie.description}</div>
			</div>
			{/* Cinema workers */}
			<div className={cn(style.participants, 'mt-[20px]')}>
				<Chip
					variant="shadow"
					className="block max-w-full mb-[10px] text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Авторы
				</Chip>

				<div className={style.participantsgrid}>
					{movie.participants
						.filter((participant) => participant.profession.title !== 'Актер')
						.map((item) => (
							<div className={style.participant} key={item.id}>
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
											className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md"
										>
											{item.profession.title}
										</Chip>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
			{/* The actors */}
			<div className={cn(style.participants, 'mt-[20px]')}>
				<Chip
					variant="shadow"
					className="block max-w-full mb-[10px] text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Актеры
				</Chip>

				<div className={style.participantsgrid}>
					{movie.participants
						.filter((participant) => participant.profession.title === 'Актер')
						.map((item) => (
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
											className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md"
										>
											{item.profession.title}
										</Chip>
									</div>
								</div>
							</div>
						))}
				</div>
			</div>
		</div>
	);
};
