'use client';
import '@/app/globals.css';

import { Auth0Provider, useAuth0 } from '@auth0/auth0-react';

import Auth from '@/app/(auth)/_auth';
import Loading from '@/app/_loading';

const AuthContainer = ({ children }) => {
	const { isLoading, isAuthenticated, loginWithPopup } = useAuth0();

	return (
		<Auth0Provider
			domain={process.env.AUTH0_DOMAIN}
			clientId={process.env.AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: 'http://localhost:3000'
			}}
			useRefreshTokens={true}
			cacheLocation="localstorage"
		>
			<div className="relative z-50">
				<Loading show={isLoading} />
				{isAuthenticated ? children : <Auth loginWithPopup={loginWithPopup} />}
			</div>
		</Auth0Provider>
	);
};

export default AuthContainer;
