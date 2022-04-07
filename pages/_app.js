import Head from "next/head";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Chirp</title>
			</Head>
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
