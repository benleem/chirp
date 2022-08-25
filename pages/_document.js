import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="utf-8" />
				<link rel="icon" href="/img/logo.svg" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/logo-192x192.png" />
				<meta name="theme-color" content="#f0f2f5" />
				<meta
					name="apple-mobile-web-app-status-bar-style"
					content="black-translucent"
				/>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
