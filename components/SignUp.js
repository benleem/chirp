import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";
import { useState, useEffect } from "react";

const SignUp = () => {
	const [formValues, setFormValues] = useState({ email: "", password: "" });
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const signUp = () => {
		createUserWithEmailAndPassword(auth, formValues.email, formValues.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				sendEmailVerification(user);
				console.log(user);
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
		if (!values.password) {
			errors.password = "Please enter a valid password";
		}
		return errors;
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			signUp();
		}
	}, [formErrors]);

	useEffect(() => {
		console.log(firebaseError);
	}, [firebaseError]);

	return (
		<form onSubmit={(e) => handleSubmit(e)} noValidate>
			<div>
				<input type="email" name="email" placeholder="Email" onChange={(e) => handleChange(e)} />
				{formErrors.email ? <p>{formErrors.email}</p> : null}
			</div>
			<div>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.password ? <p>{formErrors.password}</p> : null}
			</div>
			<button type="submit">Submit</button>
		</form>
	);
};

export default SignUp;
