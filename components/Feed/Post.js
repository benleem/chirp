import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { motion } from "framer-motion";

import { db, storage } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/client/useAuth";
import { useUser } from "../../hooks/client/useUser";

import styles from "../../styles/Posts/Post.module.css";

const Post = ({ postId, post, favorites }) => {
	const user = useAuth();
	const userInfo = useUser();
	const router = useRouter();

	const [commentHover, setCommentHover] = useState(false);
	const [favoriteHover, setFavoriteHover] = useState(false);
	const [editHover, setEditHover] = useState(false);
	const [deleteHover, setDeleteHover] = useState(false);

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
		const userRef = doc(db, `users/${user.uid}`);
		try {
			if (favorites.includes(postId)) {
				const updatedFavorites = favorites.filter(
					(favorite) => favorite !== postId
				);
				await updateDoc(userRef, {
					favorites: updatedFavorites,
				});
				if (router.pathname === "/favorited") {
					router.replace(router.asPath);
				}
			} else {
				await updateDoc(userRef, {
					favorites: [...favorites, postId],
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	const deletePost = async () => {
		const docRef = doc(db, "posts", postId);
		const userRef = doc(db, `users/${user.uid}`);

		const deleteDocmuent = async () => {
			await deleteDoc(docRef);

			const updatedPosts = userInfo.posts.filter((post) => post !== postId);
			await updateDoc(userRef, {
				posts: updatedPosts,
			});

			await router.replace(router.asPath);
			window.scrollTo({ top: 0, behavior: "smooth" });
		};

		try {
			if (post.fileRef.includes("firebasestorage")) {
				const imgRef = ref(storage, post.fileRef);
				await deleteObject(imgRef);
			}
			deleteDocmuent();
		} catch (error) {
			if (error.code === "storage/object-not-found") {
				console.log(error.message);
				try {
					deleteDocmuent();
				} catch (error) {
					console.log(error.message);
				}
			}
		}
	};

	return (
		<div className={styles.post}>
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
							onMouseEnter={() => setCommentHover(true)}
							onMouseLeave={() => setCommentHover(false)}
						>
							{commentHover ? (
								<motion.img
									animate={{
										opacity: 1,
									}}
									className={styles.interactButtonImg}
									src="/img/comment-hover.svg"
									alt=""
								/>
							) : (
								<motion.img
									className={styles.interactButtonImg}
									src="/img/comment.svg"
									alt=""
								/>
							)}
						</button>
						<button
							className={styles.interactButton}
							onMouseEnter={() => setFavoriteHover(true)}
							onMouseLeave={() => setFavoriteHover(false)}
							onClick={handleFavorite}
						>
							{favorites.includes(postId) || favoriteHover ? (
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
