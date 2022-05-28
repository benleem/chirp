import { useEffect, useState } from "react";
import { updatePassword } from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";

import FormError from "../FormState/FormError";

import styles from "../../styles/ProfileSettings/ChangePasswordForm.module.css";

const ChangePasswordForm = ({ setFormLoading }) => {
	const [formValues, setFormValues] = useState({
		password: "",
		confirm: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const changePassword = async () => {
		try {
			setFormLoading(true);
			await updatePassword(auth.currentUser, formValues.confirm);
			setFormLoading(false);
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
		setFormErrors(validate(formValues));
		setIsSubmitted(true);
	};

	const validate = (values) => {
		const errors = {};
		if (
			!values.password ||
			values.password.includes(" ") ||
			values.password.length < 6
		) {
			errors.password = "Please enter a valid password";
		}
		if (values.confirm !== values.password) {
			errors.confirm = "These passwords don't match";
		}
		return errors;
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			changePassword();
		}
		console.log(formErrors);
	}, [formErrors]);

	useEffect(() => {
		console.log(formValues);
	}, [formValues]);

	return (
		<form
			className={styles.changePasswordForm}
			onSubmit={(e) => handleSubmit(e)}
		>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="password">
					New password
				</label>
				<input
					className={styles.inputField}
					name="password"
					type="password"
					placeholder="Example123!"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.password ? (
					<FormError error={formErrors.password} firebaseError={false} />
				) : null}
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="confirm">
					Confirm password
				</label>
				<input
					className={styles.inputField}
					name="confirm"
					type="password"
					placeholder="Example123!"
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

export default ChangePasswordForm;
