import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore";
import { updateEmail } from "firebase/auth";
import Image from "next/image";

import { db, auth } from "../../firebase/firebaseConfig";

import styles from "../../styles/ProfileSettings/EditProfileForm.module.css";

const EditProfileForm = ({ token, userData, setFormLoading }) => {
	const router = useRouter();
	const imageInputArea = useRef();

	const [formValues, setFormValues] = useState({
		displayName: "",
		description: "",
		email: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const editUser = async () => {
		const userRef = doc(db, `users/${token.uid}`);
		try {
			setFormLoading(true);
			// update user doc
			await updateDoc(userRef, {
				displayName: formValues.displayName,
				description: formValues.description,
			});

			// update user email
			await updateEmail(auth.currentUser, formValues.email);
			setFormLoading(false);

			await router.replace(router.asPath);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error) {
			setFormLoading(false);
			const errorCode = error.code;
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
		if (!values.displayName || values.displayName.includes(" ")) {
			errors.displayName = "Please enter a valid display name";
		}
		if (
			!values.email ||
			!values.email.includes("@") ||
			values.email.includes(" ")
		) {
			errors.email = "Please enter a valid email";
		}
		if (!values.description) {
			errors.description = "Please enter a valid description";
		}
		return errors;
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			editUser();
		}
	}, [formErrors]);

	useEffect(() => {
		setFormValues({
			...formValues,
			displayName: userData.displayName,
			description: userData.description,
			email: token.email,
		});
	}, []);

	return (
		<form className={styles.editProfileForm} onSubmit={(e) => handleSubmit(e)}>
			<div className={styles.inputContainer}>
				<div className={styles.leftColumn}>
					<div className={styles.imageContainer}>
						<Image
							src={userData.imgUrl}
							alt="User picture"
							layout="fixed"
							width="75px"
							height="75px"
							objectFit="cover"
							priority
						/>
					</div>
				</div>
				<div className={styles.rightColumn}>
					<p className={styles.name}>{userData.displayName}</p>
					<input
						ref={imageInputArea}
						className={styles.mediaUpload}
						type="file"
						name="imageUpload"
						accept="image/*"
						// onChange={(e) => handleFileChange(e)}
					/>
					<button
						className={styles.mediaUploadButton}
						type="button"
						onClick={() => imageInputArea.current.click()}
					>
						Change Profile Picture
					</button>
				</div>
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="displayName">
					Display Name
				</label>
				<input
					className={styles.inputField}
					type="text"
					name="displayName"
					autoComplete="off"
					defaultValue={userData.displayName}
					// placeholder="example@email.com"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.displayName ? (
					<p className={styles.formError}>{formErrors.displayName}</p>
				) : null}
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="description">
					Description
				</label>
				<input
					className={styles.inputField}
					type="text"
					name="description"
					autoComplete="off"
					defaultValue={userData.description}
					// placeholder="example@email.com"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.description ? (
					<p className={styles.formError}>{formErrors.description}</p>
				) : null}
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="email">
					Email
				</label>
				<input
					className={styles.inputField}
					type="email"
					name="email"
					autoComplete="off"
					defaultValue={token.email}
					// placeholder="example@email.com"
					onChange={(e) => handleChange(e)}
				/>
				{formErrors.email ? (
					<p className={styles.formError}>{formErrors.email}</p>
				) : null}
			</div>
			<button className={styles.submitButton} type="submit">
				Submit
			</button>
			{firebaseError ? (
				<p className={styles.firebaseError}>{firebaseError}</p>
			) : null}
		</form>
	);
};

export default EditProfileForm;
