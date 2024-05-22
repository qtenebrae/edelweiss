import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SignInProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onOpenSignUp: () => void;
}
