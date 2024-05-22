import { MovieDetailsProps } from './MovieDetails.props';
import { Chip, Link, Select, SelectItem } from '@nextui-org/react';
import style from './MovieDetails.module.css';

export const MovieDetails = ({
	title,
	plot,
	genres,
	director,
	agelimit,
	rating,
	...props
}: MovieDetailsProps): JSX.Element => {
	const statuses = [
		{ status: 'viewed', title: 'Просмотрено' },
		{ status: 'abandoned', title: 'Брошено' },
		{ status: 'deferred', title: 'Отложено' },
		{ status: 'planned', title: 'Запланировано' },
		{ status: 'reviewing', title: 'Пересматриваю' },
		{ status: 'looking', title: 'Смотрю' },
	];

	return (
		<div {...props}>
			<Link
				href="/test"
				className="block mb-[10px] font-bold text-white text-[16px] transition hover:text-secondary-200"
			>
				{title}
			</Link>
			<p className="mb-[10px] text-white/95">{plot}</p>
			<p className="inline-block mr-[5px]">Жанры:</p>
			{genres.map((item) => (
				<Chip size="sm" className="mr-[3px] mt-[3px]">
					{item}
				</Chip>
			))}
			<br />
			<p className="inline-block mr-[5px] mt-[3px]">Режисер:</p>
			<Chip size="sm" className="mr-[3px] mt-[3px]">
				{director}
			</Chip>
			<br />
			<p className="inline-block mr-[5px] mt-[3px]">Возраст:</p>
			<Chip size="sm" className="mr-[3px] mt-[3px]">
				{agelimit}
			</Chip>
			<Select
				radius="md"
				color="secondary"
				placeholder="Добавить в список"
				className=" mt-[6px] mb-[35px] w-[190px]"
				classNames={{ trigger: 'h-[32px] min-h-0' }}
			>
				{statuses.map((item) => (
					<SelectItem key={item.status}>{item.title}</SelectItem>
				))}
			</Select>
			<p className="absolute bottom-[10px] right-[75px]">рейтинг</p>
			<Chip radius="md" color="success" size="lg" className="absolute bottom-[7px] right-[5px]">
				{rating}
			</Chip>
		</div>
	);
};
