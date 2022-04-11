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
			</Head>
			<Header />
			<Component {...pageProps} />
		</>
	);
}

export default MyApp;
