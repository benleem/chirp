import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { updateEmail } from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/client/useAuth";

import FormError from "../FormState/FormError";
import InputField from "../FormState/InputField";
import SubmitButton from "../FormState/SubmitButton";

import styles from "../../styles/ProfileSettings/ChangeEmailForm.module.css";

const ChangeEmailForm = ({ setFormLoading }) => {
	const user = useAuth();
	const router = useRouter();
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
			router.replace(`/${user.uid}`);
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
			<InputField
				label="New Email"
				reference={emailInput}
				id="email"
				type="email"
				placeholder="example@email.com"
				formError={formErrors.email}
				handleChange={handleChange}
			/>
			<InputField
				label="Confirm Email"
				id="confirm"
				type="email"
				placeholder="example@email.com"
				addMargin={true}
				formError={formErrors.confirm}
				handleChange={handleChange}
			/>
			<SubmitButton text="Submit" />
			{firebaseError ? (
				<FormError error={firebaseError} firebaseError={true} />
			) : null}
		</form>
	);
};

export default ChangeEmailForm;
