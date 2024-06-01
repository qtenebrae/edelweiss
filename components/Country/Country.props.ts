import { ICountry } from '@/interfaces';
import { Dispatch, SetStateAction } from 'react';

export interface CountryProps {
	countries: ICountry[];
	setCountries: Dispatch<SetStateAction<ICountry[]>>;
}
