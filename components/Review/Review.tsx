import { ReviewProps } from './Review.props';
import { User, Chip } from '@nextui-org/react';
import style from './Review.module.css';
import { Rating } from '../Rating/Rating';
import cn from 'classnames';

export const Review = ({ review, ...props }: ReviewProps) => {
	return (
		<div className={cn(style.review, 'mb-[20px]')} {...props}>
			<User
				as="button"
				avatarProps={{
					isBordered: true,
					src: 'https://avatars.githubusercontent.com/u/96431033?s=96&v=4',
				}}
				className={cn(style.user, 'transition-transform')}
				description="@qtenebrae"
				name="Ivanov Sergey"
			/>

			<div className={style.information}>
				<div className="text-[14px]">Положительный отзыв</div>
				<div className="text-[14px] text-default-500">В списки у пользователя:</div>
			</div>

			<div className={style.userscore}>
				{' '}
				<Chip variant="shadow" className="text-[16px] text-default-500 bg-success-200/30">
					Просмотрено
				</Chip>
				<Rating rating={1}></Rating>
			</div>

			<div className={style.estimation}>{`13+ / 4- | 6 месяцев назад`}</div>

			<div className={style.content}>
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
				labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
				laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
				voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
				cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
			</div>

			<Chip
				variant="shadow"
				className={cn(style.feedback, 'text-[16px] text-default-500 bg-secondary-200/30')}
			>
				{`Этот отзыв был полезен?`}
				<button className="text-success-400 ml-[10px]">Да</button>
				{` / `}
				<button className="text-danger-400">Нет</button>
			</Chip>
		</div>
	);
};
