import { IFeedback } from './feedback.interface';

export interface IMovie {
	id: number;
	title: string;
	alternativeTitle: string;
	release: Date;
	description: string;
	rating: number;
	duration: number;
	numberOfEpisodes: number;
	ageLimit: number;
	posterUrl: string;
	typeId: number;
	statusId: number;
	feedback: IFeedback[];
}
