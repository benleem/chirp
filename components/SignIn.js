import { useState, useEffect } from "react";

import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import styles from "../styles/AuthModal.module.css";

const SignIn = ({ chooseForm, setChooseForm }) => {
	const [formValues, setFormValues] = useState({
		email: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const loginUser = () => {
		signInWithEmailAndPassword(auth, formValues.email, formValues.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				setFirebaseError(errorMessage);
			});
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

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

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
