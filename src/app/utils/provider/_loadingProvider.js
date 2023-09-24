'use client';
import '@/app/globals.css';

import { useAuth0 } from '@auth0/auth0-react';

import Auth from '@/app/(auth)/_auth';
import Loading from '@/app/components/_loading';

const LoadingProvider = ({ children }) => {
	const { isLoading, isAuthenticated, loginWithPopup } = useAuth0();
	return (
		<div className="relative z-50">
			<Loading show={isLoading} />
			{isAuthenticated ? children : <Auth loginWithPopup={loginWithPopup} />}
		</div>
	);
};

export default LoadingProvider;