import { useRef } from "react";

import styles from "../styles/AddPostModal.module.css";

const AddPostModal = ({ showPostModal, setShowPostModal }) => {
	const textArea = useRef();

	const handleSubmit = (e) => {
		e.preventDefault();
		setShowPostModal(!showPostModal);
	};

	const handleTextChange = (e) => {
		textArea.current.style.height = "min-content";
		textArea.current.style.height = `${e.target.scrollHeight}px`;
	};

	return (
		<div className={styles.addPostModalContainer}>
			<form className={styles.addPostModal} onSubmit={(e) => handleSubmit(e)}>
				<p className={styles.modalTitle}>Add Post</p>
				<textarea
					className={styles.textInput}
					ref={textArea}
					onChange={(e) => handleTextChange(e)}
					placeholder="What's chirpin?"
					name="textInput"
				></textarea>
				<div className={styles.mediaUploadContainer}>
					<p>Media:</p>
					<input
						className={styles.imageUpload}
						type="file"
						name="imageUpload"
						accept="image/*"
					/>
				</div>
				<button className={styles.submitButton} type="submit">
					Post
				</button>
			</form>
		</div>
	);
};

export default AddPostModal;
