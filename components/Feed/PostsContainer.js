import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getDoc, query, doc } from "firebase/firestore";
import InfiniteScroll from "react-infinite-scroll-component";

import { db } from "../../firebase/firebaseConfig";
import { infiniteScrollFetch } from "../../hooks/client/infiniteScrollFetch";

import Post from "./Post";
import ScrollLoading from "./ScrollLoading";

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
	const router = useRouter();
	const [deletedFavorites, setDeletedFavorites] = useState([]);

	const getNewBatch = async () => {
		const latestPostId = posts[posts.length - 1].id;
		try {
			const newBatch = await infiniteScrollFetch(
				latestPostId,
				router.pathname,
				uid
			);
			if (newBatch.length < 1 || newBatch === undefined) {
				setCheckHasMore(false);
			} else {
				setPosts([...posts, ...newBatch]);
				setCheckHasMore(true);
			}
		} catch (error) {
			console.log(error);
		}
	};

	const checkFavorites = () => {
		const queuedFavorites = [];
		favorites.map(async (favorite) => {
			const postQuery = query(doc(db, `posts/${favorite}`));
			try {
				const currentFavorite = await getDoc(postQuery);
				if (currentFavorite.data() === undefined) {
					queuedFavorites.push(favorite);
					setDeletedFavorites(queuedFavorites);
				}
			} catch (error) {
				console.log(error);
			}
		});
	};

	useEffect(() => {
		checkFavorites();
	}, []);

	useEffect(() => {
		console.log(deletedFavorites);
		if (deletedFavorites.length > 0) {
			console.log("Favorite(s) have been deleted and need to be removed");
		}
	}, [deletedFavorites]);

	return (
		<div className={styles.postsContainer}>
			<InfiniteScroll
				dataLength={posts.length}
				next={getNewBatch}
				hasMore={checkHasMore}
				loader={<ScrollLoading />}
				e
			>
				{posts?.map((post) => (
					<Post
						key={post.id}
						postId={post.id}
						post={post.data}
						posts={posts}
						setPosts={setPosts}
						favorites={favorites}
						setFavorites={setFavorites}
					/>
				))}
			</InfiniteScroll>
		</div>
	);
};

export default PostsContainer;
