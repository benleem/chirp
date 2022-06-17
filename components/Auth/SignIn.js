import { useState, useRef, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import Link from "next/link";

import FormError from "../FormState/FormError";

import styles from "../../styles/Auth/AuthModal.module.css";

const SignIn = ({ chooseForm, setChooseForm, auth }) => {
	const emailInput = useRef();
	const router = useRouter();
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
			router.push("/home");
		} catch (error) {
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
		}
	};

	const handleChange = (e) => {
		const { id, value } = e.target;
		setFormValues({ ...formValues, [id]: value });
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
		emailInput.current.focus();
	}, []);

	return (
		<form
			className={styles.authModal}
			onSubmit={(e) => handleSubmit(e)}
			noValidate
		>
			<p className={styles.modalTitle}>Sign In</p>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="email">
					Email
				</label>
				<input
					ref={emailInput}
					className={styles.inputField}
					id="email"
					type="email"
					placeholder="example@email.com"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.email ? (
					<FormError error={formErrors.email} firebaseError={false} />
				) : null}
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="password">
					Password
				</label>
				<input
					className={styles.inputField}
					id="password"
					type="password"
					placeholder="Example123!"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.password ? (
					<FormError error={formErrors.password} irebaseError={false} />
				) : null}
			</div>
			<button className={styles.submitButton} type="submit">
				Sign In
			</button>
			<Link href="/recover">
				<a className={styles.forgotPassword}>Forgot password?</a>
			</Link>
			<p className={styles.query}>Don't have an account?</p>
			<button
				type="button"
				className={styles.answer}
				onClick={() => setChooseForm(!chooseForm)}
			>
				Sign Up
			</button>
			{firebaseError ? (
				<FormError error={firebaseError} firebaseError={true} />
			) : null}
		</form>
	);
};

export default SignIn;
