import { useEffect, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";

import { auth } from "../../firebase/firebaseConfig";

import FormLoading from "../FormState/FormLoading";
import FormError from "../FormState/FormError";

// import styles from "../../styles/ProfileSettings/RecoverPasswordForm.module.css";
import styles from "../../styles/ProfileSettings/RecoverForm.module.css";

const RecoverPasswordForm = () => {
	const router = useRouter();

	const [formValues, setFormValues] = useState({
		email: "",
	});
	const [formLoading, setFormLoading] = useState(false);
	const [firebaseError, setFirebaseError] = useState("");

	const resetPassword = async () => {
		try {
			setFormLoading(true);
			await sendPasswordResetEmail(auth, formValues.email);
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

	const handleSubmit = async (e) => {
		e.preventDefault();
		await resetPassword();
	};

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
						Enter the email associated with your account, and we'll send a link
						to reset your password.
					</p>
				</div>
				<input
					className={styles.inputField}
					id="email"
					type="email"
					onChange={(e) => handleChange(e)}
				/>
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

export default RecoverPasswordForm;
