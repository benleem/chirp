import { useRef, useState, useEffect } from "react";

// import { useUser } from "../context/UserContext";

import GiphyContainer from "./GiphyModal/GiphyContainer";

import styles from "../styles/AddPostModal.module.css";

const AddPostModal = ({ showPostModal, setShowPostModal }) => {
	// const user = useUser();

	const textArea = useRef();
	const imageInputArea = useRef();

	const [formValues, setFormValues] = useState({
		text: "",
	});
	const [formErrors, setFormErrors] = useState({});
	// const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);
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

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			setShowPostModal(!showPostModal);
			console.log("Form submitted");
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
							<img className={styles.mediaPreviewFile} src={file} alt="" />
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
