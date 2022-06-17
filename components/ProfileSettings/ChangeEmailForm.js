import { useEffect, useRef, useState } from "react";
import { updateEmail } from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";

import FormError from "../FormState/FormError";

import styles from "../../styles/ProfileSettings/ChangeEmailForm.module.css";

const ChangeEmailForm = ({ setFormLoading }) => {
	const emailInput = useRef();

	const [formValues, setFormValues] = useState({
		email: "",
		confirm: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const changeEmail = async () => {
		try {
			setFormLoading(true);
			await updateEmail(auth.currentUser, formValues.email);
			setFormLoading(false);
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
		setFormErrors(validate(formValues));
		setIsSubmitted(true);
	};

	const validate = (values) => {
		const errors = {};
		if (
			!values.email ||
			values.email.includes(" ") ||
			!values.email.includes("@")
		) {
			errors.email = "Please enter a valid email";
		}
		if (values.confirm !== values.email) {
			errors.confirm = "These emails don't match";
		}
		return errors;
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			changeEmail();
		}
	}, [formErrors]);

	useEffect(() => {
		emailInput.current.focus();
	}, []);

	return (
		<form
			className={styles.changeEmailForm}
			onSubmit={(e) => handleSubmit(e)}
			noValidate
		>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="email">
					New email
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
				<label className={styles.inputLabel} htmlFor="confirm">
					Confirm email
				</label>
				<input
					className={styles.inputField}
					id="confirm"
					type="email"
					placeholder="example@email.com"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.confirm ? (
					<FormError error={formErrors.confirm} firebaseError={false} />
				) : null}
			</div>
			<button className={styles.submitButton} type="submit">
				Submit
			</button>
			{firebaseError ? (
				<FormError error={firebaseError} firebaseError={true} />
			) : null}
		</form>
	);
};

export default ChangeEmailForm;
