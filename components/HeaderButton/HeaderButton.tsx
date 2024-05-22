import { Button, ButtonProps, cn } from '@nextui-org/react';

export const HeaderButton = ({ className, children, ...props }: ButtonProps) => {
	return (
		<Button
			variant="bordered"
			radius="full"
			className={cn(
				className,
				'px-12 text-default-900 text-[20px] border-default-200 hover:border-default-400 active:border-secondary-200',
			)}
			{...props}
		>
			{children}
		</Button>
	);
};
