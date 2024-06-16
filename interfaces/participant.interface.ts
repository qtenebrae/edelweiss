import { IPerson } from './person.interface';
import { IProfession } from './profession.interface';

export interface IParticipant {
	id: number;
	character?: string;
	professionId: number;
	movieId: number;
	personId: number;
	person: IPerson;
	profession: IProfession;
}
