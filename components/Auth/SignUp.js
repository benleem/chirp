import { useState, useEffect } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { ref, getDownloadURL } from "firebase/storage";

import { db, storage } from "../../firebase/firebaseConfig";

import FormError from "../FormState/FormError";

import styles from "../../styles/Auth/AuthModal.module.css";

const SignUp = ({ chooseForm, setChooseForm, auth }) => {
	const router = useRouter();
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

			const storageRef = ref(storage, `background/sample-background.jpg`);
			const sampleBackground = await getDownloadURL(storageRef);

			await setDoc(doc(db, "users", user.uid), {
				displayName: formValues.displayName,
				imgUrl: `https://avatars.dicebear.com/api/pixel-art-neutral/${user.uid}.svg`,
				backgroundUrl: sampleBackground,
				createdAt: user.metadata.creationTime,
				description: "",
				posts: 0,
				favorites: 0,
			});

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
				<label className={styles.inputLabel} htmlFor="displayName">
					Display Name
				</label>
				<input
					className={styles.inputField}
					id="displayName"
					type="text"
					placeholder="coolperson123"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.displayName ? (
					<FormError error={formErrors.displayName} firebaseError={false} />
				) : null}
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="email">
					Email
				</label>
				<input
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
					<FormError error={formErrors.password} firebaseError={false} />
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
				<FormError error={firebaseError} firebaseError={true} />
			) : null}
		</form>
	);
};

export default SignUp;
