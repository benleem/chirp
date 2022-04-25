import Post from "./Post";

import styles from "../../styles/Posts/PostsContainer.module.css";

const PostsContainer = ({ posts }) => {
	return (
		<div className={styles.postsContainer}>
			{posts?.map((post) => (
				<Post post={post} />
			))}
		</div>
	);
};

export default PostsContainer;
