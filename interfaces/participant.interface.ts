import { ISex } from './sex.interface';

export interface IParticipant {
	id: number;
	firstname: string;
	lastname: string;
	middlename: string;
	birthday: Date;
	dateOfDeath: Date;
	sexId: number;
	sex: ISex;
}
