/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		APP_ORIGIN: process.env.APP_ORIGIN,
		API_URL: process.env.API_URL,
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
	}
};

module.exports = nextConfig;
