import { useEffect, useRef, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";

import { auth } from "../../firebase/firebaseConfig";

import FormError from "../FormState/FormError";
import InputField from "../FormState/InputField";
import SubmitButton from "../FormState/SubmitButton";
import ForgotPassword from "../FormState/ForgotPassword";

import styles from "../../styles/ProfileSettings/Reauthenticate.module.css";

const Reauthenticate = ({ email, setFormLoading, setIsAuthenticated }) => {
	const passwordInput = useRef();

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
		const { id, value } = e.target;
		setFormValues({ ...formValues, [id]: value });
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		confirmPassword();
	};

	useEffect(() => {
		passwordInput.current.focus();
	}, []);

	return (
		<form
			className={styles.reauthenticate}
			onSubmit={(e) => handleSubmit(e)}
			noValidate
		>
			<InputField
				label="Confirm Password"
				reference={passwordInput}
				id="password"
				type="password"
				placeholder="Example123!"
				addMargin={true}
				handleChange={handleChange}
			/>
			<SubmitButton text="Submit" />
			{firebaseError ? (
				<FormError error={firebaseError} firebaseError={true} />
			) : null}
			<ForgotPassword addPadding={true} />
		</form>
	);
};

export default Reauthenticate;
