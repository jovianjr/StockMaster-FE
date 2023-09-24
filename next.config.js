/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
	}
};

module.exports = nextConfig;
