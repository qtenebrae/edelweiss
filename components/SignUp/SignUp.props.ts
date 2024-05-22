import { DetailedHTMLProps, HTMLAttributes } from 'react';

export interface SignUpProps
	extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
	isOpen: boolean;
	onOpen: () => void;
	onClose: () => void;
	onOpenSignIn: () => void;
}
