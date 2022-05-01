import { useState } from "react";
import nookies from "nookies";

import { auth } from "../firebase/firebaseConfig";
import { adminAuth } from "../firebase/firebaseAdmin";

import SignUp from "../components/Auth/SignUp";
import SignIn from "../components/Auth/SignIn";

import styles from "../styles/Auth/Auth.module.css";

export const getServerSideProps = async (context) => {
	try {
		const cookies = nookies.get(context);
		const token = await adminAuth.verifyIdToken(cookies.token);

		if (token !== undefined || token !== "" || token !== null) {
			context.res.writeHead(302, { Location: "/home" });
			context.res.end();
		}

		return { props: { token } };
	} catch (err) {
		return { props: {} };
	}
};

const Auth = ({ token }) => {
	console.log(token);
	const [chooseForm, setChooseForm] = useState(false);

	return (
		<div className={styles.modalContainer}>
			{chooseForm ? (
				<SignUp
					chooseForm={chooseForm}
					setChooseForm={setChooseForm}
					auth={auth}
				/>
			) : (
				<SignIn
					chooseForm={chooseForm}
					setChooseForm={setChooseForm}
					auth={auth}
				/>
			)}
		</div>
	);
};

export default Auth;
