import Post from "./Post";

import styles from "../../styles/Posts/PostsContainer.module.css";

const PostsContainer = ({ posts }) => {
	return (
		<div className={styles.postsContainer}>
			{posts?.map((post) => (
				<Post key={post.id} postId={post.id} post={post.data} />
			))}
		</div>
	);
};

export default PostsContainer;
