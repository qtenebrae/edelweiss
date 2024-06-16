import { AuthContext } from '@/context/auth.context';
import { useContext, useEffect, useState } from 'react';
import { Chip, cn, Image, Link } from '@nextui-org/react';
import style from './User.module.css';
import { GATEWAY_HOST } from '@/constants';
import { ICategory, IHistory, IMovie } from '@/interfaces';
import axios from 'axios';

export const User = () => {
	const { isAuth } = useContext(AuthContext);

	const [categories, setCategories] = useState<ICategory[]>([]);
	const [userHistory, setUserHistory] = useState<IHistory[]>([]);
	const [movies, setMovies] = useState<IMovie[]>([]);

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
						},
					);
					setUserHistory(history.data);
					const ids = history.data.map((item) => item.movieId);

					const movies = await axios.post<IMovie[]>(
						`http://${GATEWAY_HOST}/catalog/movie/getMovieByIds`,
						{
							ids,
						},
					);
					setMovies(movies.data);
				}
			} catch {
				//
			}
		};
		fetchData();
	}, [isAuth]);

	return (
		<div className={style.wrapper}>
			<div className={style.user}>
				<Image
					className={cn(style.poster, 'object-cover w-[200px] h-[200px]')}
					classNames={{ wrapper: 'w-[200px] h-[200px]' }}
					src={`http://${GATEWAY_HOST}/uploads/404.jpg`}
				/>
			</div>
			<div>
				<div
					className={cn('text-[36px]', style.name)}
				>{`${isAuth?.profile.lastname} ${isAuth?.profile.firstname}`}</div>
				<div className="text-[24px] text-default-500">{`@${isAuth?.login}`}</div>
			</div>
			<div className={style.list}>
				<Chip
					variant="shadow"
					className="block max-w-full text-[18px] bg-gradient-to-tr from-secondary-200 to-primary-100"
				>
					Список фильмов
				</Chip>

				<div>
					{categories.map((c) => (
						<div key={c.id}>
							<Chip
								variant="shadow"
								className="block max-w-full text-[18px] mt-[10px] bg-gradient-to-tr from-secondary-100 to-primary-50"
							>
								{c.title}
							</Chip>
							<div className={cn('ml-[10px]', style.categoryitem)}>
								<div className="text-default-500 px-[10px]">{`Название`}</div>
								<div className="text-default-500">{`Оценка`}</div>
								<div className="text-default-500">{`Эпизоды`}</div>
								<div className="text-default-500">{`Тип`}</div>
							</div>
							{(() => {
								const records = userHistory.filter((record) => record.categoryId === c.id);
								if (records) {
									return records.map((item) => (
										<div key={item.movieId}>
											<div
												className={cn(
													'ml-[10px] rounded-lg hover:bg-secondary-50',
													style.categoryitem,
												)}
											>
												<div className="px-[10px] text-left">
													<Link href={`/movies/${item.movieId}`} className="text-secondary">
														{movies.find((m) => m.id === item.movieId)?.title}
													</Link>
												</div>
												<div className="px-[10px] text-left text-[14px]">{item.score}</div>
												<div className="px-[10px] text-left">{`${
													item.numberOfEpisodes
												}/${movies.find((m) => m.id === item.movieId)?.numberOfEpisodes}`}</div>
												<div className="px-[10px] text-left">
													{movies.find((m) => m.id === item.movieId)?.type.title}
												</div>
											</div>
										</div>
									));
								}
							})()}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};
