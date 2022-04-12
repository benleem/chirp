import { useEffect } from "react";
import Head from "next/head";
import { auth } from "../firebase/firebaseConfig";
import Header from "../components/Header";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
	auth.onAuthStateChanged((user) => {
		if (user) {
			console.log(user);
		} else {
			console.log("User is not signed in");
		}
	});

	// useEffect(() => {
	// 	console.log(auth.currentUser);
	// }, [auth.currentUser]);

	return (
		<>
			<Head>
				<title>Chirp</title>
				<meta charset="utf-8" />
				<link rel="icon" href="/img/logo.svg" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, maximum-scale=1"
				/>
				<link rel="apple-touch-icon" href="/img/logo.svg" />
			</Head>
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
