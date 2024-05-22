import { AuthClient } from '@/context/auth.context';

const inMemoryJWTService = () => {
	let inMemoryJWT: string | null = null;
	let refreshTimeoutId: NodeJS.Timeout | null = null;

	const refreshToken = (expiration: number) => {
		const timeoutTrigger = expiration * 1000 - 10000;

		refreshTimeoutId = setTimeout(async () => {
			const old_refresh_token = localStorage.getItem('refresh_token');
			const response = await AuthClient.post('/refresh', { rt: old_refresh_token });
			const { access_token, expires_in, refresh_token } = response.data;
			localStorage.setItem('refresh_token', refresh_token);
			setToken(access_token, expires_in);
		}, timeoutTrigger);
	};

	const abortRefreshToken = () => {
		if (refreshTimeoutId) {
			clearTimeout(refreshTimeoutId);
		}
	};

	const getToken = () => inMemoryJWT;

	const setToken = (token: string, tokenExpiration: number) => {
		inMemoryJWT = token;
		refreshToken(tokenExpiration);
	};

	const deleteToken = () => {
		inMemoryJWT = null;
		abortRefreshToken();
	};

	return { getToken, setToken, deleteToken };
};

export default inMemoryJWTService();
