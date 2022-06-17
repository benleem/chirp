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

import { EditContext } from "../context/EditContext";
import { useAuth } from "../hooks/client/useAuth";
import { useUser } from "../hooks/client/useUser";
import { db } from "../firebase/firebaseConfig";

import FormError from "./FormState/FormError";
import FormLoading from "./FormState/FormLoading";
import GiphyContainer from "./GiphyModal/GiphyContainer";

import styles from "../styles/AddPostModal.module.css";

const AddPostModal = ({ setShowPostModal }) => {
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
			// window.scrollTo({ top: 0, behavior: "smooth" });
			// router.replace(router.asPath, router.asPath, {
			// 	scroll: false,
			// });
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

	useEffect(() => {
		textArea.current.focus();
	}, []);

	return (
		<div className={styles.addPostModalContainer}>
			{showGiphy ? null : (
				<form
					ref={form}
					className={
						formLoading ? styles.addPostModalDisableScroll : styles.addPostModal
					}
					onSubmit={(e) => handleSubmit(e)}
				>
					{formLoading ? <FormLoading /> : null}
					{user ? (
						<>
							<div className={styles.topContainer}>
								<p className={styles.modalTitle}>Add Post</p>
								<button
									className={styles.closeButton}
									onClick={() => {
										setShowPostModal(false);
										setEditActive(false);
										setEditObject(null);
									}}
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
							<button className={styles.submitButton} type="submit">
								Post
							</button>
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
								onClick={() => {
									setShowPostModal(false);
									setEditActive(false);
									setEditObject(null);
								}}
							></button>
						</div>
					)}
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
