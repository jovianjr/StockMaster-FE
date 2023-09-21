'use client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import Button from '@/app/components/Button';

export default function Logout() {
	const router = useRouter();

	return (
		<main className="flex h-screen flex-col items-center justify-center gap-4 px-12">
			<div className="relative h-20 w-2/3 px-5">
				<Image
					src="/assets/images/logo.png"
					alt="Logo StockMaster"
					className="object-contain"
					fill
				/>
			</div>
			<p>Are you sure you want to logout?</p>
			<div className="flex w-1/2 flex-col gap-3">
				<Button href="/login" text="Logout" />
				<Button
					onClick={() => router.back()}
					text="Cancel"
					className="bg-white/30 shadow-[inset_0_2px_6px_0_rgba(255,255,255,0.25)] backdrop-blur hover:bg-white/40"
				/>
			</div>
		</main>
	);
}
