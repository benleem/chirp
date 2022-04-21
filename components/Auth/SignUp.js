import { useState, useEffect } from "react";
import {
	createUserWithEmailAndPassword,
	updateProfile,
	sendEmailVerification,
} from "firebase/auth";
import { doc, setDoc, addDoc, collection } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

import styles from "../../styles/AuthModal.module.css";

const SignUp = ({ chooseForm, setChooseForm, auth }) => {
	const [formValues, setFormValues] = useState({
		displayName: "",
		email: "",
		password: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const createUser = async () => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				formValues.email,
				formValues.password
			);
			const user = userCredential.user;
			console.log(user);
			await updateProfile(user, { displayName: formValues.displayName });
			await sendEmailVerification(user);
			await setDoc(doc(db, "users", user.uid), {
				displayName: user.displayName,
				imgUrl: user.photoURL,
				description: "",
				posts: [],
				favorites: [],
			});
			await addDoc(collection(db, `users/${user.uid}/messages`), {
				uid: "chirp",
				msg: "Welcome to chirp, take a look around",
			});
		} catch (error) {
			const errorCode = error.code;
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
			console.log(errorMessage);
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
		if (
			!values.email ||
			!values.email.includes("@") ||
			values.email.includes(" ")
		) {
			errors.email = "Please enter a valid email";
		}
		if (!values.displayName || values.displayName.includes(" ")) {
			errors.displayName = "Please enter a valid display name";
		}
		if (
			!values.password ||
			values.password.includes(" ") ||
			values.password.length < 6
		) {
			errors.password = "Please enter a valid password";
		}
		return errors;
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			createUser();
		}
	}, [formErrors]);

	return (
		<form
			className={styles.authModal}
			onSubmit={(e) => handleSubmit(e)}
			noValidate
		>
			<p className={styles.modalTitle}>Sign up</p>
			<ul className={styles.tips}>
				<li>Passwords must contain 6 or more characters</li>
				<li>Display names and passwords cannot contain a space</li>
			</ul>
			<div className={styles.inputContainer}>
				<p className={styles.inputTag}>Display Name</p>
				<input
					className={styles.inputField}
					type="text"
					name="displayName"
					placeholder="coolperson123"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.displayName ? (
					<p className={styles.formError}>{formErrors.displayName}</p>
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
