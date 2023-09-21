'use client';
import Image from 'next/image';
import Link from 'next/link';

import Navbar from '@/app/components/Navbar';
import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

export default function Home() {
	return (
		<div className="h-screen">
			<Navbar />
			<main className="flex h-full flex-col items-center justify-center px-12 pt-20">
				<div className="relative h-20 w-2/3 px-5">
					<Image
						src="/assets/images/logo.png"
						alt="Logo StockMaster"
						className="object-contain"
						fill
					/>
				</div>
				<div className="flex w-full flex-col gap-3">
					<Input name="email" placeholder="Email" />
					<Input name="password" placeholder="Password" password />
					<p className="mt-2 w-full text-center text-xs">
						Do not have an account ?{' '}
						<Link href="signup" className="font-semibold hover:underline">
							Sign up
						</Link>{' '}
						now
					</p>
				</div>
				<div className="flex w-full flex-col gap-4 pt-12">
					<Button href="/" text="Login" />
					<div className="flex w-full items-center justify-center gap-2 text-xs">
						<hr className="w-1/3" />
						<span>OR</span>
						<hr className="w-1/3" />
					</div>
					<button className="flex w-full items-center justify-center gap-4 rounded-full bg-white px-2 py-3 text-sm font-semibold text-black">
						<div className="relative aspect-square w-4">
							<Image
								src="/assets/images/logo-google.png"
								alt="Logo StockMaster"
								className="object-contain"
								fill
							/>
						</div>
						Continue With Google
					</button>
				</div>
			</main>
		</div>
	);
}
