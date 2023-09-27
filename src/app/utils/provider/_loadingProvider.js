'use client';
import '@/app/globals.css';

import { useAuth0 } from '@auth0/auth0-react';
import { useEffect } from 'react';

import axios from '@/app/utils/helpers/axios';
import Auth from '@/app/(auth)/_auth';
import Loading from '@/app/components/_loading';

const LoadingProvider = ({ children }) => {
	const { isLoading, isAuthenticated, loginWithRedirect, getAccessTokenSilently } = useAuth0();

	useEffect(() => {
		if (isAuthenticated) {
			getAccessTokenSilently().then(result => {
				axios.interceptors.request.use(
					config => {
						config.headers['Authorization'] = `Bearer ${result}`;
						return config;
					},
					error => {
						return Promise.reject(error);
					}
				);
			});
		}
	}, [isAuthenticated, getAccessTokenSilently]);
	return (
		<>
			<Loading show={isLoading} />
			{isAuthenticated ? children : <Auth continueWithGoogle={loginWithRedirect} />}
		</>
	);
};

export default LoadingProvider;
