import Head from "next/head";

import { AuthProvider } from "../context/AuthContext";
import { EditProvider } from "../context/EditContext";

import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	const getLayout = Component.getLayout || ((page) => page);
	return (
		<AuthProvider>
			<Head>
				<title>Chirp</title>
				<meta
					name="viewport"
					content="viewport-fit=cover, width=device-width, initial-scale=1, maximum-scale=1"
				/>
			</Head>
			<EditProvider>{getLayout(<Component {...pageProps} />)}</EditProvider>
		</AuthProvider>
	);
}

export default MyApp;
