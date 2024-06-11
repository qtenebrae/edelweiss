import { IPerson } from '@/interfaces';
import { Dispatch, SetStateAction } from 'react';

export interface PersonProps {
	persons: IPerson[];
	setPersons: Dispatch<SetStateAction<IPerson[]>>;
}
