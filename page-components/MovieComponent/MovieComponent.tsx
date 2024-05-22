import { Card, CardBody, Breadcrumbs, BreadcrumbItem, Chip, Image } from '@nextui-org/react';
import { MovieComponentProps } from './MovieComponent.props';
import style from './MovieComponent.module.css';
import cn from 'classnames';

export const MovieComponent = ({ movie }: MovieComponentProps) => {
	return (
		<Card className="mx-auto mt-[40px] w-[1200px] bg-background/30 backdrop-blur-[3px]">
			<CardBody className={style.wrapper}>
				<h2 className={cn(style.title, 'text-[28px]')}>
					{movie.title} / {movie.alternativeTitle}
				</h2>
				<Breadcrumbs className={style.breadcrumbs}>
					<BreadcrumbItem href="/">Главная</BreadcrumbItem>
					<BreadcrumbItem href="">Кинопроизведения</BreadcrumbItem>
					<BreadcrumbItem href="">Сериалы</BreadcrumbItem>
				</Breadcrumbs>
				<Image
					className={cn(style.poster, 'object-cover w-[200px] h-[300px]')}
					classNames={{ wrapper: 'w-[200px] h-[300px]' }}
					src="https://app.requestly.io/delay/5/https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"
				/>
				<div className={style.informationblock}>
					<Chip className="flex max-w-full">Информация</Chip>
					<span>{`Тип: ${movie.typeId}`}</span> <br />
					<span>{`Эпизоды: ${movie.numberOfEpisodes}`}</span>
					<br />
					<span>{`Длительность эпизода: ${movie.duration}`}</span>
					<br />
					<span>{`Статус: ${movie.statusId}`}</span> <br />
					<span>{`Жанры: `}</span> <br />
					<span>{`Тип: ${movie.typeId}`}</span> <br />
				</div>
				<div className={style.ratingblock}>
					<Chip className="flex max-w-full">Рейтинг</Chip>
				</div>
				<div className={style.scoreblock}>
					<Chip className="flex max-w-full">Оценки людей</Chip>
				</div>
			</CardBody>
		</Card>
	);
};
