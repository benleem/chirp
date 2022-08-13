import Post from "./Post";

import styles from "../../styles/Feed/PostsContainer.module.css";

const PostsContainer = ({
	uid,
	posts,
	setPosts,
	favorites,
	setFavorites,
	checkHasMore,
	setCheckHasMore,
}) => {
	return (
		<div className={styles.postsContainer}>
			{posts?.map((post, index) => (
				<Post
					uid={uid}
					key={post.id}
					postId={post.id}
					post={post.data}
					posts={posts}
					setPosts={setPosts}
					favorites={favorites}
					setFavorites={setFavorites}
					isLast={posts.length - 1 === index ? true : false}
					checkHasMore={checkHasMore}
					setCheckHasMore={setCheckHasMore}
				/>
			))}
		</div>
	);
};

export default PostsContainer;
