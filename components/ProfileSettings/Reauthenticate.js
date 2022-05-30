import { useEffect, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

import { auth } from "../../firebase/firebaseConfig";

import FormError from "../FormState/FormError";

import styles from "../../styles/ProfileSettings/Reauthenticate.module.css";

const Reauthenticate = ({ email, setFormLoading, setIsAuthenticated }) => {
	const [formValues, setFormValues] = useState({
		password: "",
	});
	const [firebaseError, setFirebaseError] = useState("");

	const confirmPassword = async () => {
		try {
			setFormLoading(true);
			await signInWithEmailAndPassword(auth, email, formValues.password);
			setFormLoading(false);
			setIsAuthenticated(true);
		} catch (error) {
			setFormLoading(false);
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
		}
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		confirmPassword();
	};

	return (
		<form className={styles.reauthenticate} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="password">
					Confirm Password
				</label>
				<input
					className={styles.inputField}
					name="password"
					type="password"
					placeholder="Example123!"
					onChange={(e) => handleChange(e)}
				/>
			</div>
			<button className={styles.submitButton} type="submit">
				Submit
			</button>
			{firebaseError ? (
				<FormError error={firebaseError} firebaseError={true} />
			) : null}
			<div className={styles.forgotPasswordContainer}>
				<Link href="/recover">
					<a className={styles.forgotPassword}>Forgot password?</a>
				</Link>
			</div>
		</form>
	);
};

export default Reauthenticate;
