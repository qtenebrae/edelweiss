import '@/styles/globals.css';
import { NextUIProvider } from '@nextui-org/react';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/navigation';

export default function App({ Component, pageProps }: AppProps) {
	const router = useRouter();

	return (
		<>
			<Head>
				<title>Edelweiss</title>
			</Head>
			<NextUIProvider navigate={router.push}>
				<Component {...pageProps} />
			</NextUIProvider>
		</>
	);
}
