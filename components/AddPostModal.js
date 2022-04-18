import { useRef, useState, useEffect } from "react";

import styles from "../styles/AddPostModal.module.css";

const AddPostModal = ({ showPostModal, setShowPostModal }) => {
	const textArea = useRef();
	const imageInputArea = useRef();
	const gifInputArea = useRef();

	const [formValues, setFormValues] = useState({
		text: "",
	});
	const [formErrors, setFormErrors] = useState({});
	// const [firebaseError, setFirebaseError] = useState("");
	const [isSubmitted, setIsSubmitted] = useState(false);

	const [file, setFile] = useState("");

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
		gifInputArea.current.value = null;
	};

	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			setShowPostModal(!showPostModal);
			console.log("Form submitted");
		}
	}, [formErrors]);

	// useEffect(() => {
	// 	console.log(formValues);
	// }, [formValues]);

	return (
		<div className={styles.addPostModalContainer}>
			<form className={styles.addPostModal} onSubmit={(e) => handleSubmit(e)}>
				<p className={styles.modalTitle}>Add Post</p>
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
						<input
							ref={gifInputArea}
							className={styles.mediaUpload}
							type="file"
							name="gifUpload"
							accept="image/gif"
							onChange={(e) => handleFileChange(e)}
						/>
						<button
							className={styles.mediaUploadButton}
							type="button"
							onClick={() => gifInputArea.current.click()}
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
		</div>
	);
};

export default AddPostModal;
