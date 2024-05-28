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
	useDisclosure,
	Link,
} from '@nextui-org/react';
import { SignIn, SignUp } from '@/components';
import { useContext } from 'react';
import { AuthContext } from '@/context/auth.context';
import { EdelweissIcon, LoupeIcon, NotificationIcon } from '@/constants';
import cn from 'classnames';
import { movies } from './data';

export const Header = ({ ...props }: HeaderProps) => {
	const { isAuth, handleLogOut, handleFetchProtected } = useContext(AuthContext);

	const { isOpen: isOpenSignIn, onOpen: onOpenSignIn, onClose: onCloseSignIn } = useDisclosure();

	const { isOpen: isOpenSignUp, onOpen: onOpenSignUp, onClose: onCloseSignUp } = useDisclosure();

	return (
		<div
			{...props}
			className={cn(
				styles.header,
				`fixed z-50 w-[100vw] h-[70px] bg-background/40 backdrop-blur-[32px] hover:bg-background hover:shadow-lg`,
			)}
		>
			<Link href="/movies/3">
				<EdelweissIcon />
			</Link>

			<Dropdown>
				<DropdownTrigger>
					<Button
						variant="bordered"
						radius="full"
						className="px-12 text-default-900 text-[20px] border-default-200 hover:border-default-400 active:border-secondary-200"
					>
						Главная
					</Button>
				</DropdownTrigger>
				<DropdownMenu variant="faded" aria-label="dropdown menu">
					<DropdownSection title="Навигация" showDivider>
						<DropdownItem key="movies" description="Энциклопедия кинопроизведений">
							Кинопроизведения
						</DropdownItem>
						<DropdownItem key="books" description="Энциклопедия книг">
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
						input: 'ml-4 text-[14px]',
						inputWrapper: ['h-[48px]', 'group-data-[focus=true]:border-secondary-200'],
					},
				}}
				startContent={<LoupeIcon className={cn(styles.loupe, 'w-[24px] h-[24px]')} />}
			>
				{movies.map((item) => (
					<AutocompleteItem
						key={item.id}
						textValue={`${item.title}, ${item.year}, ${item.director}`}
						href="/"
					>
						{`${item.title}, ${item.year}, ${item.director}`}
					</AutocompleteItem>
				))}
			</Autocomplete>

			<Badge
				content="99+"
				shape="circle"
				classNames={{
					badge: 'bg-secondary-200 border-secondary-200 text-md text-white',
				}}
			>
				<Button
					radius="full"
					isIconOnly
					aria-label="notifications"
					variant="bordered"
					className="hover:border-default-400 active:border-secondary-200"
					onClick={handleFetchProtected}
				>
					<NotificationIcon className="w-8 h-8" />
				</Button>
			</Badge>

			{!isAuth && (
				<div className="flex">
					<SignIn
						isOpen={isOpenSignIn}
						onOpen={onOpenSignIn}
						onClose={onCloseSignIn}
						onOpenSignUp={onOpenSignUp}
						className="mr-[20px]"
					/>
					<SignUp
						isOpen={isOpenSignUp}
						onOpen={onOpenSignUp}
						onClose={onCloseSignUp}
						onOpenSignIn={onOpenSignIn}
					/>
				</div>
			)}

			{isAuth && (
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
					<DropdownMenu variant="faded" aria-label="dropdown menu">
						<DropdownSection title="Аккаунт" showDivider>
							<DropdownItem key="movie" description="Избранные кинопроизведения">
								Список кинопроизведений
							</DropdownItem>
							<DropdownItem key="book" description="Избранные книги">
								Список книг
							</DropdownItem>
							<DropdownItem key="settings" description="Настройки аккаунта">
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
								onClick={handleLogOut}
							>
								Выход
							</DropdownItem>
						</DropdownSection>
					</DropdownMenu>
				</Dropdown>
			)}
		</div>
	);
};
