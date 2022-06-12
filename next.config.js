/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: [
			"media.giphy.com",
			"media0.giphy.com",
			"media1.giphy.com",
			"media2.giphy.com",
			"media3.giphy.com",
			"media4.giphy.com",
			"media5.giphy.com",
			"avatars.dicebear.com",
			"firebasestorage.googleapis.com",
		],
	},
};

module.exports = nextConfig;
