import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
	updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

import styles from "../styles/AuthModal.module.css";

const SignUp = ({ chooseForm, setChooseForm }) => {
	const router = useRouter();
	const [formValues, setFormValues] = useState({
		displayName: "",
		email: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const createUser = () => {
		createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				updateProfile(user, { displayName: formValues.displayName });
				sendEmailVerification(user);
				router.push("/");
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
		if (!values.email || !values.email.includes("@")) {
			errors.email = "Please enter a valid email";
		}
		if (!values.displayName || values.displayName.includes(" ")) {
			errors.displayName = "Please enter a valid display name";
		}
		if (!values.password || values.password.includes(" ")) {
			errors.password = "Please fill in this field";
		}
		return errors;
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			createUser();
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
			<p className={styles.modalTitle}>Sign up</p>
			<div className={styles.inputContainer}>
				<p className={styles.inputTag}>Display Name</p>
				<input
					className={styles.inputField}
					type="text"
					name="displayName"
					placeholder="coolguy123"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.username ? (
					<p className={styles.formError}>{formErrors.username}</p>
				) : null}
			</div>
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
				Sign Up
			</button>
			<p className={styles.query}>Already have an account?</p>
			<button
				type="button"
				className={styles.answer}
				onClick={() => setChooseForm(!chooseForm)}
			>
				Sign In
			</button>
			{firebaseError ? (
				<p className={styles.firebaseError}>{firebaseError}</p>
			) : null}
		</form>
	);
};

export default SignUp;
