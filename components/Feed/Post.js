import { useContext, useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
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
import { infiniteScrollFetch } from "../../hooks/client/infiniteScrollFetch";

import FormLoading from "../FormState/FormLoading";
import InteractionError from "./InteractionError";
import ScrollLoading from "./ScrollLoading";

import styles from "../../styles/Feed/Post.module.css";

const Post = ({
	uid,
	postId,
	post,
	posts,
	setPosts,
	favorites,
	setFavorites,
	isLast,
	checkHasMore,
	setCheckHasMore,
}) => {
	const user = useAuth();
	const router = useRouter();
	const { setEditActive, setEditObject, setEditedPosts } =
		useContext(EditContext);

	const postRef = useRef();
	const [favoriteHover, setFavoriteHover] = useState(false);
	const [editHover, setEditHover] = useState(false);
	const [deleteHover, setDeleteHover] = useState(false);
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [firebaseError, setFirebaseError] = useState("");
	const [batchLoading, setBatchLoading] = useState(false);

	const errorCountdown = (seconds) => {
		setTimeout(function () {
			setFirebaseError(null);
		}, seconds * 1000);
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

	const getNewBatch = async () => {
		const latestPostId = posts[posts.length - 1].id;
		try {
			setBatchLoading(true);
			const newBatch = await infiniteScrollFetch(
				latestPostId,
				router.pathname,
				uid
			);
			if (newBatch.length < 1 || newBatch === undefined) {
				setCheckHasMore(false);
			} else {
				newBatch = newBatch.map((post) => {
					let date = new Date(post.data.timeStamp);
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
					post.data.timeStamp = time;
					return post;
				});
				setPosts([...posts, ...newBatch]);
				setCheckHasMore(true);
			}
			setBatchLoading(false);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		if (!postRef?.current) return;
		const observer = new IntersectionObserver(([entry]) => {
			if (
				isLast === true &&
				entry.isIntersecting &&
				checkHasMore === true &&
				batchLoading === false
			) {
				getNewBatch();
			}
		});
		observer.observe(postRef.current);
	}, [postRef]);

	return (
		<>
			<div ref={postRef} className={styles.post}>
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
						<Link href={`/${post.userId}`} scroll={true}>
							<a className={styles.displayName}> {post.displayName}</a>
						</Link>
						<p className={styles.postTime}>{post.timeStamp}</p>
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
								<svg
									className={styles.interactButtonImg}
									xmlns="http://www.w3.org/2000/svg"
									height="100%"
									width="100%"
									viewBox="0 0 48 48"
									fill={
										favorites.includes(postId) || favoriteHover
											? "#fd2bff"
											: "grey"
									}
								>
									<path d="m24 41.95-2.05-1.85q-5.3-4.85-8.75-8.375-3.45-3.525-5.5-6.3T4.825 20.4Q4 18.15 4 15.85q0-4.5 3.025-7.525Q10.05 5.3 14.5 5.3q2.85 0 5.275 1.35Q22.2 8 24 10.55q2.1-2.7 4.45-3.975T33.5 5.3q4.45 0 7.475 3.025Q44 11.35 44 15.85q0 2.3-.825 4.55T40.3 25.425q-2.05 2.775-5.5 6.3T26.05 40.1ZM24 38q5.05-4.65 8.325-7.975 3.275-3.325 5.2-5.825 1.925-2.5 2.7-4.45.775-1.95.775-3.9 0-3.3-2.1-5.425T33.5 8.3q-2.55 0-4.75 1.575T25.2 14.3h-2.45q-1.3-2.8-3.5-4.4-2.2-1.6-4.75-1.6-3.3 0-5.4 2.125Q7 12.55 7 15.85q0 1.95.775 3.925.775 1.975 2.7 4.5Q12.4 26.8 15.7 30.1 19 33.4 24 38Zm0-14.85Z" />
								</svg>
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
									<svg
										className={styles.interactButtonImg}
										xmlns="http://www.w3.org/2000/svg"
										height="100%"
										width="100%"
										viewBox="0 0 48 48"
										fill={editHover ? "#ffa401" : "grey"}
									>
										<path d="M9 39h2.2l22.15-22.15-2.2-2.2L9 36.8Zm30.7-24.3-6.4-6.4 2.1-2.1q.85-.85 2.1-.85t2.1.85l2.2 2.2q.85.85.85 2.1t-.85 2.1Zm-2.1 2.1L12.4 42H6v-6.4l25.2-25.2Zm-5.35-1.05-1.1-1.1 2.2 2.2Z" />
									</svg>
								</button>
								<button
									id="delete"
									className={styles.interactButton}
									onClick={deletePost}
									onMouseEnter={() => setDeleteHover(true)}
									onMouseLeave={() => setDeleteHover(false)}
								>
									<svg
										className={styles.interactButtonImg}
										xmlns="http://www.w3.org/2000/svg"
										height="100%"
										width="100%"
										viewBox="0 0 48 48"
										fill={deleteHover ? "#fe0000" : "grey"}
									>
										<path d="M13.05 42q-1.25 0-2.125-.875T10.05 39V10.5H8v-3h9.4V6h13.2v1.5H40v3h-2.05V39q0 1.2-.9 2.1-.9.9-2.1.9Zm21.9-31.5h-21.9V39h21.9Zm-16.6 24.2h3V14.75h-3Zm8.3 0h3V14.75h-3Zm-13.6-24.2V39Z" />
									</svg>
								</button>
							</div>
						) : null}
					</div>
				</div>
			</div>
			{batchLoading ? <ScrollLoading /> : null}
		</>
	);
};

export default Post;
