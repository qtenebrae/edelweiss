import { Breadcrumbs, BreadcrumbItem, Chip, Image, Select, SelectItem } from '@nextui-org/react';
import { MovieProps } from './Movie.props';
import style from './Movie.module.css';
import cn from 'classnames';
import moment from 'moment';
import { Rating } from '@/components/Rating/Rating';
import { useState } from 'react';
import { movieRatings, statuses, workers } from './constants';
import { GATEWAY_HOST, StarIcon } from '@/constants';

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

export const Movie = ({ movie, ...props }: MovieProps) => {
	const [rating, setRating] = useState<number>(0);

	const distribution = (score, all) => {
		return (score * 100) / all;
	};

	return (
		<div className={style.wrapper} {...props}>
			<h2 className={cn(style.title, 'text-[28px]')}>
				{movie.title} / {movie.alternativeTitle}
			</h2>

			<Breadcrumbs className={style.breadcrumbs}>
				<BreadcrumbItem href="/">Главная</BreadcrumbItem>
				<BreadcrumbItem href="">Кинопроизведения</BreadcrumbItem>
			</Breadcrumbs>

			<Image
				className={cn(style.poster, 'object-cover w-[200px] h-[300px]')}
				classNames={{ wrapper: 'w-[200px] h-[300px]' }}
				src={`http://${GATEWAY_HOST}/uploads/${movie.posterUrl}`}
			/>

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

				<div className="text-[48px] font-bold text-center text-default-500">{movie.rating}</div>

				<div className="text-center text-default-500">{movieRatings[Math.round(movie.rating)]}</div>
			</div>

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

			<div className={style.userrating}>
				<Select
					radius="md"
					color="secondary"
					placeholder="Добавить в список"
					classNames={{
						value: 'text-default-900',
						trigger:
							'h-[32px] min-h-0 shadow-lg bg-gradient-to-tr from-secondary-200 to-primary-100',
						popoverContent: 'bg-gradient-to-tr from-secondary-200 to-primary-100',
					}}
				>
					{statuses.map((item) => (
						<SelectItem key={item.status}>{item.title}</SelectItem>
					))}
				</Select>

				<div className="flex justify-between mt-[10px] mb-[10px]">
					<div>Эпизоды</div>
					<div>
						{`${0}/${12}`} <button>+</button>
					</div>
				</div>

				<Rating isEditable rating={rating} setRating={setRating}></Rating>

				{rating != 0 && (
					<div className="text-[48px] font-bold text-center text-default-500">{rating}</div>
				)}

				{rating != 0 && <div className="text-center text-default-500">{movieRatings[rating]}</div>}

				{rating == 0 && <div className="text-center text-default-500 mt-[10px]">Не оценено</div>}
			</div>

			<div className={style.description}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] mb-[10px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Описание
				</Chip>

				<div>{movie.description}</div>
			</div>

			<div className={cn(style.participants, 'mt-[20px]')}>
				<Chip
					variant="shadow"
					className="block max-w-full mb-[10px] text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Авторы
				</Chip>

				<div className={style.participantsgrid}>
					{workers.map((item) => (
						<div className={style.participant}>
							<Image
								className={cn(style.pass, 'object-cover w-[60px] h-[90px]')}
								src={item.photo}
							/>

							<div>
								{item.name}
								<div className="font-bold">
									Роль:
									<Chip
										size="sm"
										className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md"
									>
										{item.role}
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
					className="block max-w-full mb-[10px] text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
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
									<Chip
										size="sm"
										className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md"
									>
										Режиссер
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
