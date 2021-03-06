const withPwa = require("next-pwa");

const nextConfig = {
	reactStrictMode: true,
	pwa: {
		dest: "public",
		disable: process.env.NODE_ENV === "development",
		register: true,
		skipWaiting: true,
	},
	images: {
		domains: [
			"media.giphy.com",
			"media0.giphy.com",
			"media1.giphy.com",
			"media2.giphy.com",
			"media3.giphy.com",
			"media4.giphy.com",
			"media5.giphy.com",
			"media6.giphy.com",
			"media7.giphy.com",
			"media8.giphy.com",
			"media9.giphy.com",
			"avatars.dicebear.com",
			"firebasestorage.googleapis.com",
		],
	},
};

module.exports = withPwa(nextConfig);
