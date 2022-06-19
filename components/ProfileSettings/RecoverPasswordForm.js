import { useEffect, useRef, useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { useRouter } from "next/router";

import { auth } from "../../firebase/firebaseConfig";

import FormLoading from "../FormState/FormLoading";
import FormError from "../FormState/FormError";
import RecoverTop from "../FormState/RecoverTop";
import InputField from "../FormState/InputField";
import SubmitButton from "../FormState/SubmitButton";

// import styles from "../../styles/ProfileSettings/RecoverPasswordForm.module.css";
import styles from "../../styles/ProfileSettings/RecoverForm.module.css";

const RecoverPasswordForm = () => {
	const emailInput = useRef();
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

	useEffect(() => {
		emailInput.current.focus();
	}, []);

	return (
		<section className={styles.recoverFormContainer}>
			<form
				className={styles.recoverForm}
				onSubmit={(e) => handleSubmit(e)}
				noValidate
			>
				{formLoading ? <FormLoading /> : null}
				<RecoverTop
					img="/img/lock.svg"
					query="Forgot your password?"
					prompt="Enter the email associated with your account, and we'll send a link
						to reset your password."
				/>
				<InputField
					reference={emailInput}
					id="email"
					type="email"
					addMargin={true}
					handleChange={handleChange}
				/>
				<SubmitButton text="Submit" />
				{firebaseError ? (
					<FormError error={firebaseError} firebaseError={true} />
				) : null}
			</form>
		</section>
	);
};

export default RecoverPasswordForm;
