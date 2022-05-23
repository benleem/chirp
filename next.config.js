/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"avatars.dicebear.com",
			"media.giphy.com",
			"firebasestorage.googleapis.com",
		],
	},
};

module.exports = nextConfig;
