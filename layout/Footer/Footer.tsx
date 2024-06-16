import { FooterProps } from './Footer.props';
import styles from './Footer.module.css';

export const Footer = ({ ...props }: FooterProps) => {
	return (
		<div {...props}>
			<div className="bg-foreground w-full h-full"></div>
		</div>
	);
};
