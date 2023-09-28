/** @type {import('next').NextConfig} */
const nextConfig = {
	env: {
		APP_ORIGIN: process.env.APP_ORIGIN,
		AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
		AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
		AUTH0_AUDIENCE: process.env.AUTH0_AUDIENCE
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
	},

	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com',
				pathname: '/**'
			}
		]
	}
};
module.exports = nextConfig;
