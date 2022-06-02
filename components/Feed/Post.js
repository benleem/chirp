import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import {
	addDoc,
	deleteDoc,
	doc,
	updateDoc,
	collection,
	serverTimestamp,
} from "firebase/firestore";
import { motion } from "framer-motion";

import { db, storage } from "../../firebase/firebaseConfig";
import { EditContext } from "../../context/EditContext";
import { useAuth } from "../../hooks/client/useAuth";
import { useUser } from "../../hooks/client/useUser";

import FormLoading from "../FormState/FormLoading";

import styles from "../../styles/Feed/Post.module.css";

const Post = ({ postId, post, favorites }) => {
	const user = useAuth();
	const userInfo = useUser();
	const router = useRouter();
	const { setEditActive, setEditObject } = useContext(EditContext);

	const [favoriteHover, setFavoriteHover] = useState(false);
	const [editHover, setEditHover] = useState(false);
	const [deleteHover, setDeleteHover] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);

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

		return <p className={styles.postTime}>{time}</p>;
	};

	const handleFavorite = async () => {
		try {
			if (favorites.favoritePostIds.includes(postId)) {
				const favoriteExists = favorites.favoritesData.filter(
					(favorite) => favorite.data.postId === postId
				);
				const deleteFavorite = favoriteExists[0];
				await deleteDoc(doc(db, "favorites", deleteFavorite.id));
			} else {
				await addDoc(collection(db, "favorites"), {
					userId: user.uid,
					postId: postId,
					timeStamp: Date.now(),
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deletePost = async () => {
		const docRef = doc(db, "posts", postId);
		const userRef = doc(db, `users/${user.uid}`);

		try {
			setDeleteLoading(true);
			await deleteDoc(docRef);
			const updatedPosts = userInfo.posts.filter((post) => post !== postId);
			await updateDoc(userRef, {
				posts: updatedPosts,
			});
			setDeleteLoading(false);

			await router.replace(router.asPath, router.asPath, {
				scroll: false,
			});
		} catch (error) {
			console.log(error.message);
		}
	};

	const editPost = () => {
		setEditActive(true);
		setEditObject({ postId: postId, text: post.text, fileRef: post.fileRef });
	};

	return (
		<div className={styles.post}>
			{deleteLoading ? <FormLoading /> : null}
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
					<>
						<img className={styles.postImg} src={post.fileRef} alt="" />
					</>
				) : null}
				<div className={styles.interactContainer}>
					<div className={styles.interactLeft}>
						<button
							className={styles.interactButton}
							onClick={handleFavorite}
							onMouseEnter={() => setFavoriteHover(true)}
							onMouseLeave={() => setFavoriteHover(false)}
						>
							{favorites.favoritePostIds.includes(postId) || favoriteHover ? (
								<img
									className={styles.interactButtonImg}
									src="/img/favorite-post-hover.svg"
									alt=""
								/>
							) : (
								<img
									className={styles.interactButtonImg}
									src="/img/favorite-post.svg"
									alt=""
								/>
							)}
						</button>
					</div>
					{post.userId === user?.uid ? (
						<div className={styles.interactRight}>
							<button
								className={styles.interactButton}
								onClick={editPost}
								onMouseEnter={() => setEditHover(true)}
								onMouseLeave={() => setEditHover(false)}
							>
								{editHover ? (
									<img
										className={styles.interactButtonImg}
										src="/img/edit-hover.svg"
										alt=""
									/>
								) : (
									<img
										className={styles.interactButtonImg}
										src="/img/edit.svg"
										alt=""
									/>
								)}
							</button>
							<button
								className={styles.interactButton}
								onClick={deletePost}
								onMouseEnter={() => setDeleteHover(true)}
								onMouseLeave={() => setDeleteHover(false)}
							>
								{deleteHover ? (
									<img
										className={styles.interactButtonImg}
										src="/img/delete-hover.svg"
										alt=""
									/>
								) : (
									<img
										className={styles.interactButtonImg}
										src="/img/delete.svg"
										alt=""
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
