/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		APP_ORIGIN: process.env.APP_ORIGIN,
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_DOMAIN: process.env.AUTH0_DOMAIN
	},
	async rewrites() {
		return [
			{
				source: '/api/auth/:path*',
				destination: '/api/auth/:path*'
			},
			{
				source: '/api/:path*',
				destination: `${process.env.API_URL}:path*`
			}
		];
	}
};

module.exports = nextConfig;
