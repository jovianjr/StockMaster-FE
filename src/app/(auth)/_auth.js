'use client';
import { useState } from 'react';
import Login from '@/app/(auth)/_login';
import SignUp from '@/app/(auth)/_signup';

export default function Auth({ loginWithPopup }) {
	const [signUp, setSignUp] = useState(false);

	return (
		<>
			{signUp ? (
				<SignUp loginWithPopup={loginWithPopup} login={() => setSignUp(false)} />
			) : (
				<Login loginWithPopup={loginWithPopup} signUp={() => setSignUp(true)} />
			)}
		</>
	);
}
