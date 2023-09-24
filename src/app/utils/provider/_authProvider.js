'use client';
import '@/app/globals.css';

import { Auth0Provider } from '@auth0/auth0-react';

const AuthProvider = ({ children }) => {
	return (
		<Auth0Provider
			domain={process.env.AUTH0_DOMAIN}
			clientId={process.env.AUTH0_CLIENT_ID}
			authorizationParams={{
				redirect_uri: process.env.APP_ORIGIN
			}}
			useRefreshTokens={true}
			cacheLocation="localstorage"
		>
			{children}
		</Auth0Provider>
	);
};

export default AuthProvider;
