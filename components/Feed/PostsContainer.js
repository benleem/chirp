import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import InfiniteScroll from "react-infinite-scroll-component";

import { useAuth } from "../../hooks/client/useAuth";
import { infiniteScrollFetch } from "../../hooks/client/infiniteScrollFetch";

import Post from "./Post";

import styles from "../../styles/Feed/PostsContainer.module.css";

const PostsContainer = ({ uid, posts, setPosts, favorites }) => {
	const router = useRouter();

	const [checkHasMore, setCheckHasMore] = useState(true);

	const getNewBatch = async () => {
		const latestPostId = posts[posts.length - 1].id;
		try {
			const newBatch = await infiniteScrollFetch(
				latestPostId,
				router.pathname,
				uid
			);
			if (newBatch.length < 1) {
				setCheckHasMore(false);
			} else {
				const newPosts = posts.concat(newBatch);
				setPosts(newPosts);
				setCheckHasMore(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className={styles.postsContainer}>
			<InfiniteScroll
				dataLength={posts.length} //This is important field to render the next data
				next={getNewBatch}
				hasMore={checkHasMore}
				loader={<h4>Loading...</h4>}
				endMessage={
					<p style={{ textAlign: "center" }}>
						<b>Yay! You have seen it all</b>
					</p>
				}
			>
				{posts?.map((post) => (
					<Post
						key={post.id}
						postId={post.id}
						post={post.data}
						favorites={favorites}
					/>
				))}
			</InfiniteScroll>
		</div>
	);
};

export default PostsContainer;
