import { ICountries } from './countries.interface';
import { IGenres } from './genres.interface';
import { IParticipant } from './participant.interface';
import { IReview } from './review.interface';
import { IStatus } from './status.interface';
import { IType } from './type.interface';

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
	type: IType;
	status: IStatus;
	genres: IGenres[];
	countries: ICountries[];
	reviews: IReview[];
	participants: IParticipant[];
}
