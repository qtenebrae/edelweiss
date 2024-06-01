import { IProfession } from '@/interfaces';
import { Dispatch, SetStateAction } from 'react';

export interface ProfessionProps {
	professions: IProfession[];
	setProfessions: Dispatch<SetStateAction<IProfession[]>>;
}
