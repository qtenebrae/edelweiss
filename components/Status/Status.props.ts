import { IStatus } from '@/interfaces';
import { Dispatch, SetStateAction } from 'react';

export interface StatusProps {
	statuses: IStatus[];
	setStatuses: Dispatch<SetStateAction<IStatus[]>>;
}
