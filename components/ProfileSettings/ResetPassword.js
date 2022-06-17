import { useEffect, useRef, useState } from "react";
import {
	confirmPasswordReset,
	EmailAuthProvider,
	reauthenticateWithCredential,
} from "firebase/auth";
import { useRouter } from "next/router";

import { auth } from "../../firebase/firebaseConfig";

import FormError from "../FormState/FormError";
import FormLoading from "../FormState/FormLoading";

import styles from "../../styles/ProfileSettings/RecoverForm.module.css";

const ResetPassword = ({ query }) => {
	const passwordInput = useRef();
	const router = useRouter();

	const [formValues, setFormValues] = useState({
		password: "",
		confirm: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [formLoading, setFormLoading] = useState(false);
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const resetPassword = async () => {
		const user = auth.currentUser;

		try {
			setFormLoading(true);
			await confirmPasswordReset(auth, query.oobCode, formValues.password);
			if (user) {
				await reauthenticateWithCredential(
					user,
					EmailAuthProvider.credential(user.email, formValues.password)
				);
			}
			setFormLoading(false);
			router.push("/home");
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
			resetPassword();
		}
	}, [formErrors]);

	useEffect(() => {
		passwordInput.current.focus();
	}, []);

	return (
		<section className={styles.recoverFormContainer}>
			<form
				className={styles.recoverForm}
				onSubmit={(e) => handleSubmit(e)}
				noValidate
			>
				{formLoading ? <FormLoading /> : null}
				<div className={styles.topContainer}>
					<img className={styles.img} src="/img/lock.svg" alt="lock" />
					<p className={styles.query}>Forgot your password?</p>
					<p className={styles.prompt}>
						Enter your new password, then confirm it. It should be at least 6
						characters with capital letters, numbers, and characters.
					</p>
				</div>
				<div className={styles.inputContainer}>
					<input
						ref={passwordInput}
						className={styles.inputField}
						id="password"
						type="password"
						onChange={(e) => handleChange(e)}
					/>
					{formErrors.password ? (
						<FormError error={formErrors.password} firebaseError={false} />
					) : null}
				</div>
				<div className={styles.inputContainer}>
					<input
						className={styles.inputField}
						id="confirm"
						type="password"
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
		</section>
	);
};

export default ResetPassword;
