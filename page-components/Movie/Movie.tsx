import { Breadcrumbs, BreadcrumbItem, Chip, Image, Select, SelectItem } from '@nextui-org/react';
import { MovieProps } from './Movie.props';
import style from './Movie.module.css';
import cn from 'classnames';
import moment from 'moment';
import { Rating } from '@/components/Rating/Rating';
import { useState } from 'react';
import { movieRatings, statuses } from './constants';

export const Movie = ({ movie, ...props }: MovieProps) => {
	const [rating, setRating] = useState<number>(0);

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
				src="https://app.requestly.io/delay/5000/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
			/>

			<div className={cn(style.information, 'text-[14px]')}>
				<Chip variant="shadow" className="block max-w-full text-[18px] bg-secondary-200/70">
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
							className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md"
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
							className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md"
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
				<Chip variant="shadow" className="block max-w-full text-[18px] bg-secondary-200/70">
					Рейтинг
				</Chip>

				<div className="flex justify-center mt-[10px]">
					<Rating rating={Math.round(movie.rating)}></Rating>
				</div>

				<div className="text-[48px] font-bold text-center text-default-500">{movie.rating}</div>

				<div className="text-center text-default-500">{movieRatings[Math.round(movie.rating)]}</div>
			</div>

			<div className={style.score}>
				<Chip variant="shadow" className="block max-w-full text-[18px] bg-secondary-200/70">
					Оценки людей
				</Chip>
			</div>

			<div className={style.userrating}>
				<Select
					radius="md"
					color="secondary"
					placeholder="Добавить в список"
					classNames={{
						value: 'text-default-900',
						trigger: 'h-[32px] min-h-0 shadow-lg bg-secondary-200/70 ',
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
					className="block max-w-full text-[18px] mb-[10px] bg-secondary-200/70"
				>
					Описание
				</Chip>

				<div>{movie.description}</div>
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
		</div>
	);
};
