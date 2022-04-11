import { useState } from "react";

import SignUp from "../components/SignUp";
import SignIn from "../components/SignIn";

import styles from "../styles/Auth.module.css";

const auth = () => {
	const [chooseForm, setChooseForm] = useState(false);

	return (
		<div className={styles.modalContainer}>
			{chooseForm ? (
				<SignUp chooseForm={chooseForm} setChooseForm={setChooseForm} />
			) : (
				<SignIn chooseForm={chooseForm} setChooseForm={setChooseForm} />
			)}
		</div>
	);
};

export default auth;
