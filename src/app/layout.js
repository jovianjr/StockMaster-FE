import '@/app/globals.css';

import clsx from 'clsx';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

import AuthProvider from '@/app/utils/provider/_authProvider';
import LoadingProvider from '@/app/utils/provider/_loadingProvider';
import QueryProvider from '@/app/utils/provider/queryProvider';
import Profile from './_profile';

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
					'min-w-screen relative min-h-screen bg-black text-white'
				)}
			>
				<div className="fixed left-0 top-0 h-full w-full">
					<Image src="/assets/images/eclipse-blue.png" alt="Eclipse blue" fill />
					<Image src="/assets/images/eclipse-purple.png" alt="Eclipse purple" fill />
				</div>
				<AuthProvider>
					<LoadingProvider>
						<QueryProvider>
							<div className="relative z-50 lg:flex lg:h-full lg:gap-10 lg:px-10 lg:py-24">
								<div className="w-full lg:w-[70%]">{children}</div>
								<div className="hidden h-full w-[30%] lg:flex">
									<Profile
										className="lg:w-full lg:pb-0"
										patternClassName="lg:hidden"
									/>
								</div>
							</div>
						</QueryProvider>
					</LoadingProvider>
				</AuthProvider>
				<div className="mt-4 hidden w-full bg-black py-2 text-center text-xs lg:block">
					© Copyright 2023, Kana Team
				</div>
			</body>
		</html>
	);
}
