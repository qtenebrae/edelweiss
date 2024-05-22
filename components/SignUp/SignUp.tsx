import {
	Button,
	Input,
	Modal,
	ModalBody,
	ModalContent,
	ModalFooter,
	ModalHeader,
} from '@nextui-org/react';
import { FormEvent, useContext, useMemo, useState } from 'react';
import { SignUpProps } from './SignUp.props';
import { AuthContext } from '@/context/auth.context';
import { HeaderButton } from '../HeaderButton/HeaderButton';
import { EyeSlashFilledIcon, EyeFilledIcon, SwapIcon } from '@/constants';

export const SignUp = ({ isOpen, onOpen, onClose, onOpenSignIn, className }: SignUpProps) => {
	// Взаимодействие с модальным окном
	const handleOpen = () => {
		onOpen();
	};

	// Скрытие вводимых символов для пароля
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	// Валидация введенных пользователем данных
	const [login, setLogin] = useState('');

	const [email, setEmail] = useState('');
	const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

	const isInvalid = useMemo(() => {
		if (email === '') return false;

		return validateEmail(email) ? false : true;
	}, [email]);

	const [firstName, setFirstName] = useState('');

	const [lastName, setLastName] = useState('');

	const [password, setPassword] = useState('');

	// signUp
	const { handleSignUp } = useContext(AuthContext);

	const signUp = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();

		try {
			const response = await handleSignUp({ login, email, firstName, lastName, password });

			if (response?.status == 201) {
				onClose();
				onOpenSignIn();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const swapModal = () => {
		onClose();
		onOpenSignIn();
	};

	return (
		<>
			<HeaderButton className={className} onPress={() => handleOpen()}>
				Регистрация
			</HeaderButton>
			<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<form action="POST" onSubmit={signUp}>
						<ModalHeader className="flex flex-col gap-1">Регистрация</ModalHeader>
						<ModalBody>
							<Input
								type="text"
								label="Имя пользователя"
								isRequired
								value={login}
								onValueChange={setLogin}
							/>
							<Input
								type="email"
								label="Адрес электронной почты"
								isInvalid={isInvalid}
								color={isInvalid ? 'danger' : 'default'}
								value={email}
								onValueChange={setEmail}
								isRequired
							/>
							<Input
								type="text"
								label="Имя"
								value={firstName}
								onValueChange={setFirstName}
								isRequired
							/>
							<Input
								type="text"
								label="Фамилия"
								value={lastName}
								onValueChange={setLastName}
								isRequired
							/>
							<Input
								label="Пароль"
								endContent={
									<button className="focus:outline-none" type="button" onClick={toggleVisibility}>
										{isVisible ? (
											<EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
										) : (
											<EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
										)}
									</button>
								}
								type={isVisible ? 'text' : 'password'}
								value={password}
								onValueChange={setPassword}
								isRequired
							/>
						</ModalBody>
						<ModalFooter>
							<Button
								color="primary"
								variant="flat"
								onPress={swapModal}
								endContent={<SwapIcon className="w-4 h-4" />}
							>
								Вход
							</Button>
							<Button color="secondary" variant="flat" type="submit">
								Создать аккаунт
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};
