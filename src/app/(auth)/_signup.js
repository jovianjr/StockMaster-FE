'use client';
import Image from 'next/image';
import { useAuth0 } from '@auth0/auth0-react';

import Button from '@/app/components/Button';
import Input from '@/app/components/Input';

export default function SignUp({ login = () => {} }) {
	const { loginWithPopup } = useAuth0();

	return (
		<main className="relative z-50 flex h-screen flex-col items-center justify-center px-12">
			<div className="relative h-20 w-2/3 px-5">
				<Image
					src="/assets/images/logo.png"
					alt="Logo StockMaster"
					className="object-contain"
					fill
				/>
			</div>
			<div className="flex w-full flex-col gap-3">
				<Input name="username" placeholder="Username" />
				<Input name="email" placeholder="Email" />
				<Input name="password" placeholder="Password" password />
				<Input name="confirm_password" placeholder="Confirm Password" password />
				<p className="mt-2 w-full text-center text-xs">
					Already have an account?{' '}
					<span className="cursor-pointer font-semibold hover:underline" onClick={login}>
						Login
					</span>{' '}
					now
				</p>
			</div>
			<div className="flex w-full flex-col gap-4 pt-12">
				<Button text="Sign Up" onClick={() => loginWithPopup()} />
				<div className="flex w-full items-center justify-center gap-2 text-xs">
					<hr className="w-1/3" />
					<span>OR</span>
					<hr className="w-1/3" />
				</div>
				<button
					className="flex w-full items-center justify-center gap-4 rounded-full bg-white px-2 py-3 text-sm font-semibold text-black"
					onClick={loginWithPopup}
				>
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
	);
}
