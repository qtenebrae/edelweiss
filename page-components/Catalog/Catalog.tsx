import style from './Catalog.module.css';
import cn from 'classnames';
import {
	Card,
	CardBody,
	CardFooter,
	Chip,
	Image,
	Link,
	Popover,
	PopoverContent,
	PopoverTrigger,
	Radio,
	RadioGroup,
	Select,
	SelectItem,
} from '@nextui-org/react';
import { ICategory, IMovie } from '@/interfaces';
import { useContext, useEffect, useState } from 'react';
import { GATEWAY_HOST } from '@/constants';
import { AuthContext } from '@/context/auth.context';
import axios from 'axios';

export const Catalog = () => {
	const { isAuth } = useContext(AuthContext);

	const [movies, setMovies] = useState<IMovie[]>([]);
	const [categories, setCategories] = useState<ICategory[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const [movies, categories] = await Promise.all([
					axios.get(`http://${GATEWAY_HOST}/catalog/movie/findAll`),
					axios.get(`http://${GATEWAY_HOST}/feedback/category/findAll`),
				]);
				setMovies(movies.data);
				setCategories(categories.data);
			} catch {
				//
			}
		};
		fetchData();
	}, [isAuth]);

	return (
		<div className={style.wrapper}>
			<h2 className={cn(style.title, 'text-[28px]')}>Фильмы</h2>

			<p className={cn(style.information, 'text-[14px]')}>
				На данной странице отображены фильмы, отсортированные по рейтингу
			</p>

			<div className={cn(style.filter, '')}>
				<div>
					<Chip
						variant="shadow"
						className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
					>
						Сортировка
					</Chip>

					<RadioGroup className="mt-[10px] ml-[10px]">
						<Radio value="buenos-aires">по рейтингу</Radio>
						<Radio value="buenos-aires">по количеству оценок</Radio>
						<Radio value="sydney">по популярности</Radio>
						<Radio value="san-francisco">по названию</Radio>
						<Radio value="london">по дате выхода</Radio>
					</RadioGroup>
				</div>

				<div className="mt-[40px]">
					<Chip
						variant="shadow"
						className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
					>
						Страны
					</Chip>

					<Select radius="md" label="Все страны" className="mt-[20px]"></Select>
				</div>

				<div className="mt-[40px]">
					<Chip
						variant="shadow"
						className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
					>
						Жанры
					</Chip>

					<Select radius="md" label="Все жанры" className="mt-[20px]"></Select>
				</div>

				<div className="mt-[40px]">
					<Chip
						variant="shadow"
						className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
					>
						Годы
					</Chip>

					<Select radius="md" label="Все годы" className="mt-[20px]"></Select>
				</div>
			</div>
			<div className={cn(style.catalog, '')}>
				{movies.map((item) => (
					<Popover placement="right" key={item.id}>
						<PopoverTrigger>
							<Card className="w-[160px] h-[325px] bg-background/40 hover:bg-gradient-to-tr from-secondary-200 to-primary-100 hover:shadow-lg">
								<CardBody className="overflow-visible p-[5px]">
									<Image
										isZoomed
										className="object-cover z-0 w-full h-[260px]"
										src={`http://${GATEWAY_HOST}/uploads/${item.posterUrl}`}
									/>
								</CardBody>
								<CardFooter className="block pb-[10px] pt-0">
									<div className="font-bold text-default-900 text-[18px] truncate">
										{item.title}
									</div>
									<div className="text-default-500 text-[14px] truncate">
										{item.alternativeTitle}
									</div>
								</CardFooter>
							</Card>
						</PopoverTrigger>
						<PopoverContent
							className={cn(
								style.content,
								'block p-[10px] w-[240px] bg-background shadow-lg backdrop-blur-[4px]',
							)}
						>
							<Link
								className="font-bold text-default-900 text-[16px] transition hover:text-secondary"
								href={`/movies/${item.id}`}
							>
								{item.title}
							</Link>
							<div>{`${item.description.slice(0, 200)}...`}</div>
							<div className="font-bold">
								Жанры:
								{item.genres &&
									item.genres.map((g) => (
										<Chip
											key={g.genre.id}
											size="sm"
											className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md"
										>
											{g.genre.title}
										</Chip>
									))}
							</div>
							<div className="font-bold">
								Режиссер:
								{(() => {
									const director = item.participants.find(
										(participant) => participant.profession.title === 'Режиссер',
									);
									return director ? (
										<Chip
											size="sm"
											className="bg-gradient-to-tr from-secondary-200 to-primary-100 ml-[5px] mt-[3px] shadow-md"
										>
											{director.person.lastname} {director.person.firstname}
										</Chip>
									) : (
										<span>Не найден</span>
									);
								})()}
							</div>
							<div className="font-bold">
								Возрастное ограничение:
								<span className="font-normal ml-[5px] text-default-500">{`${item.ageLimit}+`}</span>
							</div>
							<Select
								radius="md"
								color="secondary"
								placeholder="Добавить в список"
								className="w-[190px]"
								classNames={{
									value: 'text-default-900',
									trigger:
										'h-[32px] min-h-0 shadow-lg bg-gradient-to-tr from-secondary-200 to-primary-100',
								}}
							>
								{categories.map((item) => (
									<SelectItem key={item.id}>{item.title}</SelectItem>
								))}
							</Select>

							<div className="font-bold">
								Рейтинг:
								<Chip size="lg" className="bg-success-300 ml-[5px] mt-[3px] shadow-md">
									{item.rating}
								</Chip>
							</div>
						</PopoverContent>
					</Popover>
				))}
			</div>
		</div>
	);
};
