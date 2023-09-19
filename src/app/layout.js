import '@/app/globals.css';
import clsx from 'clsx';
import Image from 'next/image';
import { Poppins } from 'next/font/google';

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
					'relative h-screen w-screen bg-black text-white'
				)}
			>
				<Image src="/assets/images/eclipse-blue.png" alt="Eclipse blue" fill />
				<Image src="/assets/images/eclipse-purple.png" alt="Eclipse purple" fill />
				<div className="relative z-50">{children}</div>
			</body>
		</html>
	);
}
