'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/app/components/Button';
import { useAuth0 } from '@auth0/auth0-react';

const Logout = () => {
	const router = useRouter();
	const { logout } = useAuth0();

	const logoutWithRedirect = () =>
		logout({
			logoutParams: {
				returnTo: process.env.APP_ORIGIN
			}
		});

	return (
		<div className="fixed left-0 top-0 z-[100] h-screen w-screen bg-black">
			<Image src="/assets/images/eclipse-blue.png" alt="Eclipse blue" fill />
			<Image src="/assets/images/eclipse-purple.png" alt="Eclipse purple" fill />
			<main className="relative z-[100] flex h-screen w-screen flex-col items-center justify-center gap-4 px-12 lg:mx-auto">
				<div className="relative h-20 w-2/3 px-5 lg:w-1/4">
					<Image
						src="/assets/images/logo.png"
						alt="Logo StockMaster"
						className="object-contain"
						fill
					/>
				</div>
				<p>Are you sure you want to logout?</p>
				<div className="flex w-1/2 flex-col gap-3">
					<Button onClick={() => logoutWithRedirect()} text="Logout" />
					<Button
						onClick={() => router.back()}
						text="Cancel"
						className="bg-white/30 shadow-[inset_0_2px_6px_0_rgba(255,255,255,0.25)] backdrop-blur hover:bg-white/40"
					/>
				</div>
			</main>
		</div>
	);
};

export default Logout;
