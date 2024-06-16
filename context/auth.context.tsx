import axios, { AxiosResponse } from 'axios';
import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import inMemoryJWT from '@/api/inMemoryJWT';
import { ISingIn, ISingUp } from '@/interfaces';
import { GATEWAY_HOST } from '@/constants/index';
import { toast } from 'react-toastify';
import { IUser } from '@/interfaces/user.interface';

export interface IAuthContext {
	isAuth: IUser | null;
	setIsAuth: Dispatch<SetStateAction<null>>;
	handleFetchProtected: () => void;
	handleLogOut: () => void;
	handleSignUp: (object: ISingUp) => Promise<AxiosResponse<unknown, unknown> | undefined>;
	handleSignIn: (object: ISingIn) => Promise<AxiosResponse<unknown, unknown> | undefined>;
}

export const AuthClient = axios.create({
	baseURL: `http://${GATEWAY_HOST}/auth`,
	withCredentials: true,
});

export const ResourceClient = axios.create({
	baseURL: `http://${GATEWAY_HOST}/`,
	withCredentials: true,
});

ResourceClient.interceptors.request.use(
	(config) => {
		const accessToken = inMemoryJWT.getToken();

		if (accessToken) {
			config.headers['Authorization'] = `${accessToken}`;
		}

		return config;
	},
	(error) => {
		Promise.reject(error);
	},
);

export const AuthContext = createContext<IAuthContext>({
	isAuth: null,
	setIsAuth: () => {},
	handleFetchProtected: () => {},
	handleLogOut: () => {},
	handleSignUp: async () => undefined,
	handleSignIn: async () => undefined,
});

export const AuthContextProvider = ({ children }: PropsWithChildren): JSX.Element => {
	const [isAuth, setIsAuth] = useState(null);

	const handleFetchProtected = async () => {
		try {
			const response = await ResourceClient.get('/catalog/movie/findById/1');
			console.log(response.data);
		} catch (error) {
			console.error(error);
		}
	};

	const handleLogOut = async () => {
		try {
			const refresh_token = localStorage.getItem('refresh_token');
			AuthClient.post('/logout', { rt: refresh_token });
			localStorage.removeItem('refresh_token');
			inMemoryJWT.deleteToken();
			setIsAuth(null);

			toast.success('До новых встреч!');
		} catch (error) {
			toast.error('Увы...');
		}
	};

	const handleSignUp = async (data: ISingUp) => {
		try {
			const response = await AuthClient.post('/signup', data);

			toast.success('Успешная регистрация!');
			toast.success('Вы можете войти в аккаунт.');
			return response;
		} catch (error) {
			toast.error('Ошибка регистрации!');
		}
	};

	const handleSignIn = async (data: ISingIn) => {
		try {
			const response = await AuthClient.post('/signin', data);
			const { access_token, expires_in, refresh_token } = response.data;
			localStorage.setItem('refresh_token', refresh_token);
			inMemoryJWT.setToken(access_token, expires_in);

			const sub = await ResourceClient.post('/auth/introspect');
			const user = await ResourceClient.post('/profile/get', { id: sub.data.sub });
			setIsAuth(user.data);

			toast.success('Успешный вход в аккаунт!');
			return response;
		} catch (error) {
			toast.error('Ошибка входа!');
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			const old_refresh_token = localStorage.getItem('refresh_token');
			if (!old_refresh_token) return;
			try {
				const response = await AuthClient.post('/refresh', { rt: old_refresh_token });
				const { access_token, expires_in, refresh_token } = response.data;
				localStorage.setItem('refresh_token', refresh_token);
				inMemoryJWT.setToken(access_token, expires_in);

				const sub = await ResourceClient.post('/auth/introspect');
				const user = await ResourceClient.post('/profile/get', { id: sub.data.sub });
				setIsAuth(user.data);
			} catch (error) {
				toast.error('Не авторизован.');
			}
		};
		fetchData();
	}, []);

	return (
		<AuthContext.Provider
			value={{ isAuth, setIsAuth, handleFetchProtected, handleLogOut, handleSignUp, handleSignIn }}
		>
			{children}
		</AuthContext.Provider>
	);
};
