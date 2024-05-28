import { TrendingMoviesProps } from './TrendingMovies.props';
import styles from './TrendingMovies.module.css';
import {
	Chip,
	Card,
	Image,
	CardFooter,
	Popover,
	PopoverContent,
	PopoverTrigger,
	CardBody,
	Link,
	Select,
	SelectItem,
} from '@nextui-org/react';
import { movies, movie, statuses } from './constants';
import cn from 'classnames';

export const TrendingMovies = ({ ...props }: TrendingMoviesProps): JSX.Element => {
	return (
		<div {...props}>
			<Chip className="flex max-w-full px-[24px] mb-[10px] text-[20px] text-white bg-gradient-to-tr from-secondary-300 to-primary-200 shadow-lg">
				Сейчас на экранах
			</Chip>

			<div className={styles.wrapper}>
				{movies.map((item) => (
					<Popover placement="right" key={item.id}>
						<PopoverTrigger>
							<Card className="bg-background/40 hover:bg-secondary-200/60 hover:shadow-lg">
								<CardBody className="overflow-visible p-[5px]">
									<Image isZoomed className="object-cover z-0 w-full h-[260px]" src={item.src} />
								</CardBody>
								<CardFooter className="block pb-[10px] pt-0">
									<div className="font-bold text-default-900 text-[18px] truncate">
										{item.title_rus}
									</div>
									<div className="text-default-500 text-[14px] truncate">{item.title_eng}</div>
								</CardFooter>
							</Card>
						</PopoverTrigger>
						<PopoverContent
							className={cn(
								styles.content,
								'block p-[10px] w-[240px] bg-background shadow-lg backdrop-blur-[4px]',
							)}
						>
							<Link
								className="font-bold text-default-900 text-[16px] transition hover:text-secondary"
								href="/"
							>
								{movie.title}
							</Link>

							<div>{movie.plot}</div>

							<div className="font-bold">
								Жанры:
								{movie.genres.map((genre) => (
									<Chip
										key={genre}
										size="sm"
										className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md"
									>
										{genre}
									</Chip>
								))}
							</div>

							<div className="font-bold">
								Режиссер:
								<Chip size="sm" className="bg-secondary-100 ml-[5px] mt-[3px] shadow-md">
									{movie.director}
								</Chip>
							</div>

							<div className="font-bold">
								Возрастное ограничение:
								<span className="font-normal ml-[5px] text-default-500">{`${movie.agelimit}+`}</span>
							</div>

							<Select
								radius="md"
								color="secondary"
								placeholder="Добавить в список"
								className="w-[190px]"
								classNames={{
									value: 'text-default-900',
									trigger: 'h-[32px] min-h-0 shadow-lg bg-secondary-200/70 ',
								}}
							>
								{statuses.map((item) => (
									<SelectItem key={item.status}>{item.title}</SelectItem>
								))}
							</Select>

							<div className="font-bold">
								Рейтинг:
								<Chip size="lg" className="bg-success-300 ml-[5px] mt-[3px] shadow-md">
									{movie.rating}
								</Chip>
							</div>
						</PopoverContent>
					</Popover>
				))}
			</div>
		</div>
	);
};
