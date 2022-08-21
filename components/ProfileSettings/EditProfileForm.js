import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { doc, updateDoc, writeBatch } from "firebase/firestore";
import { ref, uploadString, getDownloadURL } from "firebase/storage";
import Image from "next/image";

import { db, storage } from "../../firebase/firebaseConfig";

import FormError from "../FormState/FormError";
import InputField from "../FormState/InputField";
import SubmitButton from "../FormState/SubmitButton";

import styles from "../../styles/ProfileSettings/EditProfileForm.module.css";

const EditProfileForm = ({ token, userData, userPosts, setFormLoading }) => {
	const router = useRouter();
	const profileImageInputArea = useRef();
	const backgroundImageInputArea = useRef();

	const [formValues, setFormValues] = useState({
		displayName: "",
		description: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [profileImg, setProfileImg] = useState();
	const [backgroundImg, setBackgroundImg] = useState();

	const handleFileChange = (e, imageType) => {
		const selectedFile = e.target.files[0];
		switch (imageType) {
			case "profile":
				if (selectedFile) {
					let reader = new FileReader();
					reader.readAsDataURL(selectedFile);
					reader.onloadend = () => {
						setProfileImg(reader.result);
					};
				}
				break;
			case "background":
				if (selectedFile) {
					let reader = new FileReader();
					reader.readAsDataURL(selectedFile);
					reader.onloadend = () => {
						setBackgroundImg(reader.result);
					};
				}
				break;
		}
	};

	const editUser = async () => {
		try {
			let profileImgUrl;
			let backgroundImgUrl;

			setFormLoading(true);

			//update user images
			if (profileImg) {
				const imageRef = ref(storage, `profile/${token.uid}`);
				const image = profileImg;
				await uploadString(imageRef, image, "data_url");
				profileImgUrl = await getDownloadURL(imageRef);
			}
			if (backgroundImg) {
				const imageRef = ref(storage, `background/${token.uid}`);
				const image = backgroundImg;
				await uploadString(imageRef, image, "data_url");
				backgroundImgUrl = await getDownloadURL(imageRef);
			}

			// update user doc
			const userRef = doc(db, `users/${token.uid}`);
			await updateDoc(userRef, {
				backgroundUrl: backgroundImgUrl
					? backgroundImgUrl
					: userData.backgroundUrl,
				imgUrl: profileImgUrl ? profileImgUrl : userData.imgUrl,
				displayName: formValues.displayName,
				description: formValues.description,
			});
			setFormLoading(false);

			// update user posts with updated info
			const batch = writeBatch(db);
			userPosts.forEach((postId) => {
				const postRef = doc(db, `posts/${postId}`);
				batch.update(postRef, {
					userImg: profileImgUrl ? profileImgUrl : userData.imgUrl,
					displayName: formValues.displayName,
				});
			});
			await batch.commit();

			await router.replace(router.asPath);
			window.scrollTo({ top: 0, behavior: "smooth" });
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
		if (!values.displayName || values.displayName.includes(" ")) {
			errors.displayName = "Please enter a valid display name";
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
		});
	}, []);

	return (
		<form
			className={styles.editProfileForm}
			onSubmit={(e) => handleSubmit(e)}
			noValidate
		>
			<div className={styles.changeImages}>
				<div className={styles.backgroundImage}>
					<input
						ref={backgroundImageInputArea}
						className={styles.mediaUpload}
						id="imageUpload"
						type="file"
						accept="image/png, image/jpeg"
						onChange={(e) => handleFileChange(e, "background")}
					/>
					<div className={styles.imageContainer}>
						<Image
							src={backgroundImg ? backgroundImg : userData.backgroundUrl}
							alt="User background"
							layout="responsive"
							width="400px"
							height="200px"
							objectFit="cover"
							priority
						/>
						<div className={styles.mediaUploadButtonContainer}>
							<button
								className={styles.mediaUploadButton}
								type="button"
								onClick={() => backgroundImageInputArea.current.click()}
							>
								<img
									className={styles.mediaUploadButtonImg}
									src="/img/change-image.svg"
									alt="Change image"
								/>
							</button>
						</div>
					</div>
				</div>
				<div className={styles.profileImage}>
					<input
						ref={profileImageInputArea}
						className={styles.mediaUpload}
						id="imageUpload"
						type="file"
						accept="image/png, image/jpeg"
						onChange={(e) => handleFileChange(e, "profile")}
					/>
					<div className={styles.imageContainer}>
						<Image
							src={profileImg ? profileImg : userData.imgUrl}
							alt="User picture"
							layout="fixed"
							width="75px"
							height="75px"
							objectFit="cover"
							priority
						/>
						<div className={styles.mediaUploadButtonContainer}>
							<button
								className={styles.mediaUploadButton}
								type="button"
								onClick={() => profileImageInputArea.current.click()}
							>
								<img
									className={styles.mediaUploadButtonImg}
									src="/img/change-image.svg"
									alt="Change image"
								/>
							</button>
						</div>
					</div>
				</div>
			</div>
			<InputField
				label="Display Name"
				id="displayName"
				type="text"
				autoComplete="off"
				defaultValue={userData.displayName}
				formError={formErrors.displayName}
				handleChange={handleChange}
			/>
			<InputField
				label="Description"
				id="description"
				type="text"
				autoComplete="off"
				addMargin={true}
				defaultValue={userData.description}
				formError={formErrors.description}
				handleChange={handleChange}
			/>
			<SubmitButton text="Submit" />
			{firebaseError ? (
				<FormError error={firebaseError} firebaseError={true} />
			) : null}
		</form>
	);
};

export default EditProfileForm;
