import Head from "next/head";
import { AuthProvider } from "../context/AuthContext";

import NavbarContainer from "../components/Navbar/NavbarContainer";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<AuthProvider>
			<Head>
				<title>Chirp</title>
				<meta charSet="utf-8" />
				<link rel="icon" href="/img/logo.svg" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
				<link rel="apple-touch-icon" href="/img/logo.svg" />
			</Head>
			<NavbarContainer />
			<Component {...pageProps} />
		</AuthProvider>
	);
}

export default MyApp;
