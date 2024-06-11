import { ISex } from './sex.interface';

export interface IPerson {
	id: number;
	firstname: string;
	lastname: string;
	middlename: string;
	birthday: Date;
	dateOfDeath: Date;
	photoUrl: string;
	sexId: number;
	sex: ISex;
}
