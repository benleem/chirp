import { useEffect, useState, Suspense } from "react";
import { useRouter } from "next/router";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteObject, getDownloadURL, ref } from "firebase/storage";
import { motion } from "framer-motion";

import { db, storage } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";

import styles from "../../styles/Posts/Post.module.css";

const Post = ({ postId, post }) => {
	const user = useAuth();
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

	const deletePost = async () => {
		const docRef = doc(db, "posts", postId);
		const imgRef = ref(storage, post.fileRef);
		try {
			if (post?.fileRef.includes("firebasestorage")) {
				await deleteObject(imgRef);
			}
			await deleteDoc(docRef);
			await router.replace(router.asPath);
			window.scrollTo({ top: 0, behavior: "smooth" });
		} catch (error) {
			if (error.code === "storage/object-not-found") {
				console.log(error);
				try {
					await deleteDoc(docRef);
					await router.replace(router.asPath);
					window.scrollTo({ top: 0, behavior: "smooth" });
				} catch (error) {
					console.log(error);
				}
			}
		}
	};

	return (
		<Suspense fallback={null}>
			<div className={styles.post}>
				<div className={styles.imgContainer}>
					<img className={styles.userImg} src="/img/search.svg" alt="" />
				</div>
				<div className={styles.postContainer}>
					<div className={styles.postDetails}>
						<p className={styles.displayName}>{post.displayName}</p>
						<ConvertTime />
					</div>
					<p className={styles.postText}>{post.text}</p>
					{post.fileRef ? (
						<img className={styles.postImg} src={post.fileRef} alt="" />
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
							>
								{favoriteHover ? (
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
		</Suspense>
	);
};

export default Post;
