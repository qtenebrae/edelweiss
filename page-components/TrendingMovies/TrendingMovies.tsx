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
} from '@nextui-org/react';
import { MovieDetails } from './MovieDetails/MovieDetails';
import { movies, film } from './data';

export const TrendingMovies = ({ ...props }: TrendingMoviesProps): JSX.Element => {
	return (
		<div {...props}>
			<Chip className="flex max-w-full px-[24px] mb-[10px] text-[20px] text-white bg-gradient-to-tr from-pink-500 to-yellow-500 shadow-lg">
				Сейчас на экранах
			</Chip>
			<div className={styles.preview}>
				{movies.map((item) => (
					<Popover placement="right" key={item.id}>
						<PopoverTrigger>
							<Card className="w-[160px] h-[325px] bg-background/40 hover:bg-secondary-200/60 hover:shadow-lg">
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
						<PopoverContent className="block p-[10px] w-[240px] text-white bg-foreground/85 shadow-lg backdrop-blur-[4px]">
							<MovieDetails
								title={film.title}
								plot={film.plot}
								genres={film.genres}
								director={film.director}
								agelimit={film.agelimit}
								rating={film.rating}
							></MovieDetails>
						</PopoverContent>
					</Popover>
				))}
			</div>
		</div>
	);
};
