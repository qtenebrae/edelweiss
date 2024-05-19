import { HeaderProps } from './Header.props';
import styles from './Header.module.css';
import {
	Button,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownSection,
	DropdownItem,
	Autocomplete,
	AutocompleteItem,
	Badge,
	User,
	Link,
} from '@nextui-org/react';
import EdelweissLogo from './EdelweissLogo.svg';
import NotFoundIcon from './NotFoundIcon.svg';
import NotificationIcon from './NotificationIcon.svg';
import LoupeIcon from './LoupeIcon.svg';
import cn from 'classnames';
import { movies } from './data';

export const Header = ({ ...props }: HeaderProps) => {
	return (
		<div
			{...props}
			className={cn(
				styles.header,
				`fixed z-50 w-[100vw] h-[70px] backdrop-blur hover:bg-default-100 hover:shadow-lg`,
			)}
		>
			<Link href="/">
				<EdelweissLogo />
			</Link>

			<Dropdown>
				<DropdownTrigger>
					<Button
						variant="bordered"
						radius="full"
						className="px-12 text-default-900 text-xl border-default-200 hover:border-default-400 active:border-secondary-200"
					>
						Главная
					</Button>
				</DropdownTrigger>
				<DropdownMenu variant="faded" aria-label="Dropdown menu with description">
					<DropdownSection title="Навигация" showDivider>
						<DropdownItem
							key="movies"
							description="Энциклопедия фильмов"
							startContent={<NotFoundIcon className="w-12 h-12" />}
						>
							Фильмы
						</DropdownItem>
						<DropdownItem
							key="books"
							description="Энциклопедия книг"
							startContent={<NotFoundIcon className="w-12 h-12" />}
						>
							Книги
						</DropdownItem>
					</DropdownSection>
					<DropdownSection title="Информация">
						<DropdownItem key="information" description="Полезная информация">
							О сайте
						</DropdownItem>
						<DropdownItem
							key="socials"
							description="Мы в социальных сетях"
							className="text-primary"
							color="primary"
						>
							Социальные сети
						</DropdownItem>
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>

			<Autocomplete
				placeholder="Поиск..."
				radius="full"
				variant="bordered"
				inputProps={{
					classNames: {
						input: 'ml-4',
						inputWrapper: ['h-[48px]', 'group-data-[focus=true]:border-secondary-200'],
					},
				}}
				startContent={<LoupeIcon className={cn(styles.loupe, 'w-[22px] h-[22px]')} />}
			>
				{movies.map((item) => (
					<AutocompleteItem key={item.id}>
						<Link color="foreground" href="/test">
							{item.title + ', ' + item.year + ', ' + item.director}
						</Link>
					</AutocompleteItem>
				))}
			</Autocomplete>

			<Badge content="99+" shape="circle" color="danger">
				<Button
					radius="full"
					isIconOnly
					aria-label="more than 99 notifications"
					variant="bordered"
					className="hover:border-default-400 active:border-secondary-200"
				>
					<NotificationIcon className="w-8 h-8" />
				</Button>
			</Badge>

			<Dropdown>
				<DropdownTrigger>
					<User
						as="button"
						avatarProps={{
							isBordered: true,
							src: 'https://avatars.githubusercontent.com/u/96431033?s=96&v=4',
						}}
						className="transition-transform"
						description="@qtenebrae"
						name="Ivanov Sergey"
					/>
				</DropdownTrigger>
				<DropdownMenu variant="faded" aria-label="Dropdown menu with description">
					<DropdownSection title="Аккаунт" showDivider>
						<DropdownItem
							key="movie"
							href="/test"
							description="Избранные фильмы"
							startContent={<NotFoundIcon className="w-12 h-12" />}
						>
							Список фильмов
						</DropdownItem>
						<DropdownItem
							key="book"
							description="Избранные книги"
							startContent={<NotFoundIcon className="w-12 h-12" />}
						>
							Список книг
						</DropdownItem>
						<DropdownItem
							key="settings"
							description="Настройки аккаунта"
							startContent={<NotFoundIcon className="w-12 h-12" />}
						>
							Настройки
						</DropdownItem>
					</DropdownSection>
					<DropdownSection title="Сайт">
						<DropdownItem key="faq" description="Ответы на ваши вопросы">
							FAQ
						</DropdownItem>
						<DropdownItem
							key="leave"
							description="Не уходи!"
							className="text-danger"
							color="danger"
						>
							Выход
						</DropdownItem>
					</DropdownSection>
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};
