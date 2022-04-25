import { useState, useEffect } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";

import styles from "../../styles/Auth/AuthModal.module.css";

const SignIn = ({ chooseForm, setChooseForm, auth }) => {
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const loginUser = async () => {
		try {
			await signInWithEmailAndPassword(
				auth,
				formValues.email,
				formValues.password
			);
		} catch (error) {
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
		setFormErrors(validate(formValues));
		setIsSubmitted(true);
	};

	const validate = (values) => {
		const errors = {};
		if (!values.email) {
			errors.email = "Please fill in this field";
		}
		if (!values.password) {
			errors.password = "Please fill in this field";
		}
		return errors;
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			loginUser();
		}
	}, [formErrors]);

	return (
		<form
			className={styles.authModal}
			onSubmit={(e) => handleSubmit(e)}
			noValidate
		>
			<p className={styles.modalTitle}>Sign In</p>
			<div className={styles.inputContainer}>
				<p className={styles.inputTag}>Email</p>
				<input
					className={styles.inputField}
					type="email"
					name="email"
					placeholder="example@email.com"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.email ? (
					<p className={styles.formError}>{formErrors.email}</p>
				) : null}
			</div>
			<div className={styles.inputContainer}>
				<p className={styles.inputTag}>Password</p>
				<input
					className={styles.inputField}
					type="password"
					name="password"
					placeholder="Example123!"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.password ? (
					<p className={styles.formError}>{formErrors.password}</p>
				) : null}
			</div>
			<button className={styles.submitButton} type="submit">
				Sign In
			</button>
			<p className={styles.query}>Don't have an account?</p>
			<button
				type="button"
				className={styles.answer}
				onClick={() => setChooseForm(!chooseForm)}
			>
				Sign Up
			</button>
			{firebaseError ? (
				<p className={styles.firebaseError}>{firebaseError}</p>
			) : null}
		</form>
	);
};

export default SignIn;
