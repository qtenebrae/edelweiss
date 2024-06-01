import { IType } from '@/interfaces';
import { Dispatch, SetStateAction } from 'react';

export interface TypeProps {
	types: IType[];
	setTypes: Dispatch<SetStateAction<IType[]>>;
}
