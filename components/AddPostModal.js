import { useRef, useState, useEffect } from "react";

import { motion } from "framer-motion";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import { useUser } from "../context/UserContext";
import { db, storage } from "../firebase/firebaseConfig";

import GiphyContainer from "./GiphyModal/GiphyContainer";

import styles from "../styles/AddPostModal.module.css";

const AddPostModal = ({ showPostModal, setShowPostModal }) => {
	const user = useUser();

	const textArea = useRef();
	const imageInputArea = useRef();

	const [formValues, setFormValues] = useState({
		text: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [formLoading, setFormLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [fileToUpload, setFileToUpload] = useState();
	const [file, setFile] = useState("");
	const [showGiphy, setShowGiphy] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();
		setFormErrors(validate(formValues));
		setIsSubmitted(true);
	};

	const validate = (values) => {
		const errors = {};
		if (!values.text) {
			errors.text = "Please fill in this field";
		}
		return errors;
	};

	const handleTextChange = (e) => {
		textArea.current.style.height = "min-content";
		textArea.current.style.height = `${e.target.scrollHeight}px`;

		const { name, value } = e.target;
		setFormValues({ ...formValues, [name]: value });
	};

	const handleFileChange = (e) => {
		const selectedFile = e.target.files[0];
		setFileToUpload(selectedFile);
		if (selectedFile) {
			let reader = new FileReader();
			reader.readAsDataURL(selectedFile);
			reader.onloadend = () => {
				setFile(reader.result);
			};
		}
	};

	const removeFile = () => {
		setFile(null);
		imageInputArea.current.value = null;
	};

	const addPost = async () => {
		try {
			setFormLoading(true);
			let fileUrl = "";
			if (file) {
				if (file.includes("giphy.com")) {
					fileUrl = file;
				} else {
					const storageRef = ref(storage, `images/${fileToUpload.name}`);
					await uploadBytes(storageRef, fileToUpload);
					fileUrl = await getDownloadURL(storageRef);
				}
			}
			const docRef = await addDoc(collection(db, "posts"), {
				userId: user.uid,
				displayName: user.displayName,
				// userImg: user.photoUrl,
				text: formValues.text,
				fileRef: fileUrl,
				timeStamp: Date.now(),
			});
			console.log("Document written with ID: ", docRef.id);
			setFormLoading(false);
			setShowPostModal(!showPostModal);
		} catch (error) {
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
			setFormLoading(false);
		}
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			addPost();
		}
	}, [formErrors]);

	return (
		<div className={styles.addPostModalContainer}>
			{showGiphy ? null : (
				<form className={styles.addPostModal} onSubmit={(e) => handleSubmit(e)}>
					<div className={styles.topContainer}>
						<p className={styles.modalTitle}>Add Post</p>
						<button
							className={styles.closeButton}
							onClick={() => setShowPostModal(!showPostModal)}
						></button>
					</div>
					<div className={styles.inputContainer}>
						<textarea
							className={styles.textInput}
							ref={textArea}
							onChange={(e) => handleTextChange(e)}
							placeholder="What's chirpin?"
							name="text"
							defaultValue={formValues.text}
						/>
						{formErrors.text ? (
							<p className={styles.formError}>{formErrors.text}</p>
						) : null}
					</div>
					<div className={styles.mediaUploadContainer}>
						<p>Media</p>
						<div className={styles.mediaInputFields}>
							<input
								ref={imageInputArea}
								className={styles.mediaUpload}
								type="file"
								name="imageUpload"
								accept="image/*"
								onChange={(e) => handleFileChange(e)}
							/>
							<button
								className={styles.mediaUploadButton}
								type="button"
								onClick={() => imageInputArea.current.click()}
							>
								<img src="/img/image-upload.svg" alt="upload image" />
							</button>
							<button
								className={styles.mediaUploadButton}
								type="button"
								onClick={() => setShowGiphy(!showGiphy)}
							>
								<img src="/img/gif-upload.svg" alt="upload gif" />
							</button>
						</div>
					</div>
					{file ? (
						<div className={styles.mediaPreviewContainer}>
							<img
								className={styles.mediaPreviewFile}
								src={file}
								alt="preview"
							/>
							<button
								className={styles.mediaPreviewButton}
								type="button"
								onClick={() => removeFile()}
							>
								Remove Media
							</button>
						</div>
					) : null}
					<button className={styles.submitButton} type="submit">
						Post
					</button>
					{formLoading ? (
						<div className={styles.formLoading}>
							<motion.img
								className={styles.formLoadingSpinner}
								animate={{ rotate: 360 }}
								transition={{ loop: Infinity, ease: "linear", duration: 3 }}
								src="/img/hourglass-loading.svg"
								alt="loading"
							/>
						</div>
					) : null}
					{firebaseError ? (
						<p className={styles.firebaseError}>{firebaseError}</p>
					) : null}
				</form>
			)}
			{showGiphy ? (
				<GiphyContainer
					showGiphy={showGiphy}
					setShowGiphy={setShowGiphy}
					setFile={setFile}
				/>
			) : null}
		</div>
	);
};

export default AddPostModal;
