'use client';
import '@/app/globals.css';

import clsx from 'clsx';
import Image from 'next/image';
import { Poppins } from 'next/font/google';
import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';
import { Transition } from '@headlessui/react';

import Auth from '@/app/(auth)/_auth';
import Loading from '@/app/_loading';

const poppins = Poppins({
	subsets: ['latin'],
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata = {
	title: 'StockMaster',
	description: 'Your Freedom Partner'
};

export default function RootLayout({ children }) {
	return (
		<Auth0Provider
			domain={process.env.AUTH0_DOMAIN}
			clientId={process.env.AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: 'http://localhost:3000'
			}}
			useRefreshTokens={true}
			cacheLocation="localstorage"
		>
			<html lang="en">
				<head>
					<link rel="icon" href="/favicon.ico" />
					<link rel="manifest" href="/manifest.json" />
					<link rel="apple-touch-icon" href="/icon.png"></link>
					<meta name="theme-color" content="#fff" />
				</head>
				<body
					className={clsx(
						poppins.className,
						'relative h-screen w-screen bg-black text-white'
					)}
				>
					<Image src="/assets/images/eclipse-blue.png" alt="Eclipse blue" fill />
					<Image src="/assets/images/eclipse-purple.png" alt="Eclipse purple" fill />
					<AuthContainer>{children}</AuthContainer>
				</body>
			</html>
		</Auth0Provider>
	);
}

const AuthContainer = ({ children }) => {
	const { isLoading, isAuthenticated, loginWithPopup } = useAuth0();

	return (
		<div className="relative z-50">
			<Loading show={isLoading} />
			<Transition
				appear
				show={!isLoading}
				enter="transition-opacity ease-linear duration-75"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity ease-linear duration-150"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				{isAuthenticated ? children : <Auth loginWithPopup={loginWithPopup} />}
			</Transition>
		</div>
	);
};
