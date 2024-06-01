import { IGenre } from '@/interfaces';
import { Dispatch, SetStateAction } from 'react';

export interface GenreProps {
	genres: IGenre[];
	setGenres: Dispatch<SetStateAction<IGenre[]>>;
}
