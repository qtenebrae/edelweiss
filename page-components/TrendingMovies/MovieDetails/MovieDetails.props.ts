import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface MovieDetailsProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	title: string;
	plot: string;
	genres: string[];
	director: string;
	agelimit: string;
	rating: number;
}
