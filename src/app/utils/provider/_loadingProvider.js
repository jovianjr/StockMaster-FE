'use client';
import '@/app/globals.css';

import { useAuth0 } from '@auth0/auth0-react';

import Auth from '@/app/(auth)/_auth';
import Loading from '@/app/components/_loading';

const LoadingProvider = ({ children }) => {
	const { isLoading, isAuthenticated, loginWithRedirect, loginWithPopup } = useAuth0();
	return (
		<>
			<Loading show={isLoading} />
			{isAuthenticated ? (
				children
			) : (
				<Auth
					continueWithGoogle={
						process.env.NODE_ENV === 'production' ? loginWithRedirect : loginWithPopup
					}
				/>
			)}
		</>
	);
};

export default LoadingProvider;
