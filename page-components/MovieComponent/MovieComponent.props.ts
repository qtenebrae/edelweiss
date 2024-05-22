import { IMovie } from '@/interfaces';
import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MovieComponentProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	movie: IMovie;
}
