import { useContext, useRef, useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
	collection,
	addDoc,
	doc,
	updateDoc,
	setDoc,
	increment,
} from "firebase/firestore";
import { motion } from "framer-motion";

import { EditContext } from "../context/EditContext";
import { useAuth } from "../hooks/client/useAuth";
import { useUser } from "../hooks/client/useUser";
import { db } from "../firebase/firebaseConfig";

import FormError from "./FormState/FormError";
import FormLoading from "./FormState/FormLoading";
import InputField from "./FormState/InputField";
import SubmitButton from "./FormState/SubmitButton";
import GiphyContainer from "./GiphyModal/GiphyContainer";

import styles from "../styles/AddPostModal.module.css";

const AddPostModal = ({ showPostModal, setShowPostModal }) => {
	const user = useAuth();
	const userInfo = useUser();
	const router = useRouter();
	const {
		editActive,
		setEditActive,
		setEditObject,
		editObject,
		editedPosts,
		setEditedPosts,
	} = useContext(EditContext);

	const giphyContainer = useRef();
	const form = useRef();
	const textArea = useRef();

	const [formValues, setFormValues] = useState({
		text: "",
	});
	const [formErrors, setFormErrors] = useState({});
	const [firebaseError, setFirebaseError] = useState("");
	const [formLoading, setFormLoading] = useState(false);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [file, setFile] = useState();
	const [showGiphy, setShowGiphy] = useState(false);

	const handleClose = async () => {
		await setEditObject(null);
		await setEditActive(false);
		setShowPostModal(false);
	};

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

		const { id, value } = e.target;
		setFormValues({ ...formValues, [id]: value });
		if (editActive === true) {
			setEditObject({ ...editObject, [id]: value });
		}
	};

	const removeFile = () => {
		setFile();
	};

	const addPost = async () => {
		const postsCollectionRef = collection(db, "posts");
		const userRef = doc(db, `users/${user.uid}`);

		try {
			setFormLoading(true);
			const docRef = await addDoc(postsCollectionRef, {
				userId: user.uid,
				displayName: userInfo.displayName,
				userImg: userInfo.imgUrl,
				text: formValues.text,
				fileRef: file ? file.src : "",
				fileHeight: file ? file.height : "",
				fileWidth: file ? file.width : "",
				timeStamp: Date.now(),
			});
			const userPostsRef = doc(db, `users/${user.uid}/posts/${docRef.id}`);
			await setDoc(userPostsRef, {
				postId: docRef.id,
			});
			await updateDoc(userRef, {
				posts: increment(1),
			});
			setFormLoading(false);
			setShowPostModal(false);

			router.replace(router.asPath, router.asPath);
		} catch (error) {
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
			setFormLoading(false);
		}
	};

	const editPost = async () => {
		const postRef = doc(db, `posts/${editObject.postId}`);

		try {
			const editArray = editedPosts;
			const editPostIndex = editArray.findIndex(
				(post) => post.id == editObject.postId
			);
			editArray[editPostIndex].data.text = formValues.text;
			editArray[editPostIndex].data.fileRef = file ? file.src : "";
			editArray[editPostIndex].data.fileHeight = file ? file.height : "";
			editArray[editPostIndex].data.fileWidth = file ? file.width : "";
			setEditedPosts(editArray);

			setFormLoading(true);
			await updateDoc(postRef, {
				text: formValues.text,
				fileRef: file ? file.src : "",
				fileHeight: file ? file.height : "",
				fileWidth: file ? file.width : "",
			});
			setFormLoading(false);
			setShowPostModal(false);
			setEditActive(false);
			setEditObject(null);
		} catch (error) {
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
			setFormLoading(false);
		}
	};

	// fill form with post values that's being edited
	useEffect(() => {
		if (editObject) {
			setFormValues({ ...formValues, text: editObject.text });
			if (editObject.fileRef) {
				setFile({
					src: editObject.fileRef,
					height: editObject.fileHeight,
					width: editObject.fileWidth,
				});
			}
		}
	}, [editObject]);

	// check errors, if none run addPost
	useEffect(() => {
		if (Object.keys(formErrors).length === 0 && isSubmitted === true) {
			if (editActive === true) {
				editPost();
			} else {
				addPost();
			}
		}
	}, [formErrors]);

	// prevent scrolling when uploading post
	useEffect(() => {
		if (formLoading === true) {
			form.current.scrollTop = 0;
		}
	}, [formLoading]);

	// change height of textbox to match new lines, set focus
	useEffect(() => {
		if (user) {
			textArea.current.style.height = `${textArea.current.scrollHeight}px`;

			const end = textArea.current.value.length;
			textArea.current.setSelectionRange(end, end);
			textArea.current.focus();
		}
	}, []);

	// keep text box height after picking a gif or backing out of gif menu
	useEffect(() => {
		if (user && showGiphy === false) {
			textArea.current.style.height = `${textArea.current.scrollHeight}px`;
		}
	}, [showGiphy]);

	// close modal when user clicks outside the form
	useEffect(() => {
		const closeModal = (e) => {
			const path = e.composedPath();
			if (
				!path.includes(form.current) &&
				!path.includes(giphyContainer.current) &&
				path[0].tagName !== "IMG"
			) {
				handleClose();
			}
		};
		document.body.addEventListener("click", closeModal);
		return () => {
			document.body.removeEventListener("click", closeModal);
		};
	}, []);

	return (
		<motion.div
			className={styles.addPostModalContainer}
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 0.3,
			}}
		>
			{showGiphy ? (
				<GiphyContainer
					giphyContainer={giphyContainer}
					showGiphy={showGiphy}
					setShowGiphy={setShowGiphy}
					setFile={setFile}
				/>
			) : (
				<motion.form
					ref={form}
					className={
						formLoading ? styles.addPostModalDisableScroll : styles.addPostModal
					}
					onSubmit={(e) => handleSubmit(e)}
					exit={{ y: "-100vh", opacity: 0 }}
					transition={{
						duration: 0.3,
					}}
					noValidate
				>
					{formLoading ? <FormLoading /> : null}
					{user ? (
						<>
							<div className={styles.topContainer}>
								<p className={styles.modalTitle}>Add Post</p>
								<button
									className={styles.closeButton}
									type="button"
									onClick={handleClose}
								></button>
							</div>
							<div className={styles.inputContainer}>
								<textarea
									ref={textArea}
									className={styles.textInput}
									id="text"
									placeholder="What's chirpin?"
									defaultValue={editObject ? editObject.text : formValues.text}
									onChange={(e) => handleTextChange(e)}
								/>
								{formErrors.text ? (
									<FormError error={formErrors.text} firebaseError={false} />
								) : null}
							</div>
							<div className={styles.mediaUploadContainer}>
								<p>Media</p>
								<div className={styles.mediaInputFields}>
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
										src={file.src}
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
							<SubmitButton text="Post" />
							{firebaseError ? (
								<FormError error={firebaseError} firebaseError={true} />
							) : null}
						</>
					) : (
						<div className={styles.noUser}>
							<p className={styles.modalTitle}>
								Please sign in to use this feature
							</p>
							<button
								className={styles.closeButton}
								onClick={handleClose}
							></button>
						</div>
					)}
				</motion.form>
			)}
		</motion.div>
	);
};

export default AddPostModal;
