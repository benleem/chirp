/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	images: {
		domains: ["media4.giphy.com", "firebasestorage.googleapis.com"],
	},
};

module.exports = nextConfig;
