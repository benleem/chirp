import { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import { protectedRoute } from "../hooks/routes";
import PostsContainer from "../components/Feed/PostsContainer";

// export async function getServerSideProps() {
// 	const postsData = await getDocs(collection(db, "posts"));
// 	const posts = postsData.docs.map((doc) => doc.data());

// 	// Pass data to the page via props
// 	return { props: { posts } };
// }

const Home = () => {
	const [posts, setPosts] = useState();

	const getPosts = async () => {
		const postsData = await getDocs(collection(db, "posts"));
		const posts = postsData.docs.map((doc) => doc.data());
		setPosts(posts);
	};

	useEffect(() => {
		getPosts();
	}, []);

	return (
		<main>
			<PostsContainer posts={posts} />
		</main>
	);
};

export default protectedRoute(Home);
