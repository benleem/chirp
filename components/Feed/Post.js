import { useEffect, useState, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";

import styles from "../../styles/Posts/Post.module.css";

const Post = ({ post }) => {
	const [commentHover, setCommentHover] = useState(false);
	const [favoriteHover, setFavoriteHover] = useState(false);

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

	useEffect(() => {
		console.log(post);
	}, [post]);

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
				</div>
			</div>
		</Suspense>
	);
};

export default Post;
