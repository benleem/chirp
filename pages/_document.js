import { Html, Head, Main, NextScript } from "next/document";

const Document = () => {
	return (
		<Html lang="en">
			<Head>
				<meta charSet="utf-8" />
				<link rel="icon" href="/img/logo.svg" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="apple-touch-icon" href="/img/logo.svg" />
				<meta name="theme-color" content="#fff" />
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
};

export default Document;
