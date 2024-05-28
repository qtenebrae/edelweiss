import { IMovie } from '@/interfaces';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MovieProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	movie: IMovie;
}
