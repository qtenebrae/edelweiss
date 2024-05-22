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
import { SignInProps } from './SignIn.props';
import { AuthContext } from '@/context/auth.context';
import { HeaderButton } from '../HeaderButton/HeaderButton';
import { EyeFilledIcon, EyeSlashFilledIcon, SwapIcon } from '@/constants';

export const SignIn = ({ isOpen, onOpen, onClose, onOpenSignUp, className }: SignInProps) => {
	// Взаимодействие с модальным окном
	const handleOpen = () => {
		onOpen();
	};

	// Скрытие вводимых символов для пароля
	const [isVisible, setIsVisible] = useState(false);
	const toggleVisibility = () => setIsVisible(!isVisible);

	// Валидация введенных пользователем данных
	const [email, setEmail] = useState('');
	const validateEmail = (email: string) => email.match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}$/i);

	const isInvalid = useMemo(() => {
		if (email === '') return false;

		return validateEmail(email) ? false : true;
	}, [email]);

	const [password, setPassword] = useState('');

	// signIn
	const { handleSignIn } = useContext(AuthContext);

	const signIn = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		event.stopPropagation();
		try {
			const response = await handleSignIn({ email, password });

			if (response?.status == 200) {
				onClose();
			}
		} catch (error) {
			console.error(error);
		}
	};

	const swapModal = () => {
		onClose();
		onOpenSignUp();
	};

	return (
		<>
			<HeaderButton className={className} onPress={() => handleOpen()}>
				Вход
			</HeaderButton>
			<Modal backdrop="blur" isOpen={isOpen} onClose={onClose}>
				<ModalContent>
					<form action="POST" onSubmit={signIn}>
						<ModalHeader className="flex flex-col gap-1">Вход</ModalHeader>
						<ModalBody>
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
								Регистрация
							</Button>
							<Button color="secondary" variant="flat" type="submit">
								Войти
							</Button>
						</ModalFooter>
					</form>
				</ModalContent>
			</Modal>
		</>
	);
};
