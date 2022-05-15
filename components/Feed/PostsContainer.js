import Post from "./Post";

import styles from "../../styles/Feed/PostsContainer.module.css";

const PostsContainer = ({ posts, favorites }) => {
	return (
		<div className={styles.postsContainer}>
			{posts?.map((post) => (
				<Post
					key={post.id}
					postId={post.id}
					post={post.data}
					favorites={favorites}
				/>
			))}
		</div>
	);
};

export default PostsContainer;
