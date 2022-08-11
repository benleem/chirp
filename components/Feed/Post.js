import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
	setDoc,
	deleteDoc,
	doc,
	updateDoc,
	increment,
	serverTimestamp,
} from "firebase/firestore";
import { AnimatePresence } from "framer-motion";

import { db } from "../../firebase/firebaseConfig";
import { EditContext } from "../../context/EditContext";
import { useAuth } from "../../hooks/client/useAuth";

import FormLoading from "../FormState/FormLoading";
import InteractionError from "./InteractionError";

import styles from "../../styles/Feed/Post.module.css";

const Post = ({ postId, post, posts, setPosts, favorites, setFavorites }) => {
	const user = useAuth();
	const { setEditActive, setEditObject, setEditedPosts } =
		useContext(EditContext);

	const [favoriteHover, setFavoriteHover] = useState(false);
	const [editHover, setEditHover] = useState(false);
	const [deleteHover, setDeleteHover] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [firebaseError, setFirebaseError] = useState("");

	const errorCountdown = (seconds) => {
		setTimeout(function () {
			setFirebaseError(null);
		}, seconds * 1000);
	};

	const ConvertTime = () => {
		let date = new Date(post.timeStamp);
		let time = date.toLocaleTimeString("en-US", {
			timeZoneName: "short",
			hour12: "true",
			hour: "2-digit",
			minute: "2-digit",
			weekday: "short",
			month: "long",
			day: "numeric",
			year: "numeric",
		});

		return (
			<>
				<p suppressHydrationWarning className={styles.postTime}>
					{time}
				</p>
			</>
		);
	};

	const handleFavorite = async () => {
		const userRef = doc(db, `users/${user.uid}`);
		const docRef = doc(db, `users/${user.uid}/favorites/${postId}`);

		try {
			let updatedFavorites;
			if (favorites.includes(postId)) {
				updatedFavorites = favorites.filter((favorite) => favorite !== postId);
				setFavorites(updatedFavorites);
				await deleteDoc(docRef);
				await updateDoc(userRef, {
					favorites: increment(-1),
				});
			} else {
				updatedFavorites = [...favorites, postId];
				setFavorites(updatedFavorites);
				await setDoc(docRef, {
					postId: postId,
					timeStamp: serverTimestamp(),
				});
				await updateDoc(userRef, {
					favorites: increment(1),
				});
			}
		} catch (error) {
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
			errorCountdown(1.5);
		}
	};

	const deletePost = async () => {
		const userRef = doc(db, `users/${user.uid}`);
		const postRef = doc(db, "posts", postId);
		const userPostRef = doc(db, `users/${user.uid}/posts/${postId}`);
		const favoriteRef = doc(db, `users/${user.uid}/favorites/${postId}`);

		try {
			const updatedPosts = posts.filter((post) => post.id !== postId);

			setDeleteLoading(true);
			await deleteDoc(postRef);
			await deleteDoc(userPostRef);
			await updateDoc(userRef, {
				posts: increment(-1),
			});
			if (favorites.includes(postId)) {
				await deleteDoc(favoriteRef);
				await updateDoc(userRef, {
					favorites: increment(-1),
				});
			}
			setDeleteLoading(false);

			setPosts(updatedPosts);
		} catch (error) {
			setDeleteLoading(false);
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
			errorCountdown(1.5);
		}
	};

	const editPost = () => {
		setEditActive(true);
		setEditObject({
			postId: postId,
			text: post.text,
			fileRef: post.fileRef,
			fileHeight: post.fileHeight,
			fileWidth: post.fileWidth,
		});
		setEditedPosts(posts);
	};

	return (
		<div className={styles.post}>
			{deleteLoading ? <FormLoading /> : null}
			<AnimatePresence>
				{firebaseError ? <InteractionError /> : null}
			</AnimatePresence>
			<div className={styles.imgContainer}>
				<div className={styles.userImgWrapper}>
					<Image
						src={post.userImg}
						alt="User picture"
						layout="responsive"
						width={40}
						height={40}
						objectFit="cover"
					/>
				</div>
			</div>
			<div className={styles.postContainer}>
				<div className={styles.postDetails}>
					<Link href={`/${post.userId}`}>
						<a className={styles.displayName}> {post.displayName}</a>
					</Link>
					<ConvertTime />
				</div>
				<p className={styles.postText}>{post.text}</p>
				{post.fileRef ? (
					<div className={styles.imgWrapper}>
						<Image
							src={post.fileRef}
							alt="Post gif"
							layout="responsive"
							width={post.fileWidth}
							height={post.fileHeight}
						/>
					</div>
				) : null}
				<div className={styles.interactContainer}>
					<div className={styles.interactLeft}>
						<button
							id="favorite"
							className={styles.interactButton}
							onClick={handleFavorite}
							onMouseEnter={() => setFavoriteHover(true)}
							onMouseLeave={() => setFavoriteHover(false)}
						>
							{favorites.includes(postId) || favoriteHover ? (
								<img
									className={styles.interactButtonImg}
									src="/img/favorite-post-hover.svg"
									alt="favorite"
								/>
							) : (
								<img
									className={styles.interactButtonImg}
									src="/img/favorite-post.svg"
									alt="favorite"
								/>
							)}
						</button>
					</div>
					{post.userId === user?.uid ? (
						<div className={styles.interactRight}>
							<button
								id="edit"
								className={styles.interactButton}
								onClick={editPost}
								onMouseEnter={() => setEditHover(true)}
								onMouseLeave={() => setEditHover(false)}
							>
								{editHover ? (
									<img
										className={styles.interactButtonImg}
										src="/img/edit-hover.svg"
										alt="edit"
									/>
								) : (
									<img
										className={styles.interactButtonImg}
										src="/img/edit.svg"
										alt="edit"
									/>
								)}
							</button>
							<button
								id="delete"
								className={styles.interactButton}
								onClick={deletePost}
								onMouseEnter={() => setDeleteHover(true)}
								onMouseLeave={() => setDeleteHover(false)}
							>
								{deleteHover ? (
									<img
										className={styles.interactButtonImg}
										src="/img/delete-hover.svg"
										alt="delete"
									/>
								) : (
									<img
										className={styles.interactButtonImg}
										src="/img/delete.svg"
										alt="delete"
									/>
								)}
							</button>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};

export default Post;
