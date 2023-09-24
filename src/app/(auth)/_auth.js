'use client';
import { useState } from 'react';
import Login from '@/app/(auth)/_login';
import SignUp from '@/app/(auth)/_signup';

export default function Auth({ continueWithGoogle = () => {} }) {
	const [signUp, setSignUp] = useState(false);

	return (
		<>
			{signUp ? (
				<SignUp
					continueWithGoogle={continueWithGoogle}
					redriectLogin={() => setSignUp(false)}
				/>
			) : (
				<Login
					continueWithGoogle={continueWithGoogle}
					redriectSignUp={() => setSignUp(true)}
				/>
			)}
		</>
	);
}
