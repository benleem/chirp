import { useState } from "react";

import { publicRoute } from "../hooks/routes";

import SignUp from "../components/Auth/SignUp";
import SignIn from "../components/Auth/SignIn";

import styles from "../styles/Auth.module.css";

const Auth = ({ auth }) => {
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

export default publicRoute(Auth);
