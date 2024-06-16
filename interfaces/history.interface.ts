import { IMovie } from './movie.interface';

export interface IHistory {
	authorId: string;
	categoryId: number;
	movieId: number;
	numberOfEpisodes: number;
	score: number;
	movies: IMovie[];
}
