import { useEffect, useState } from "react";
import {
	getDocs,
	collection,
	query,
	doc,
	orderBy,
	onSnapshot,
	documentId,
} from "firebase/firestore";

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
	const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));

	const [posts, setPosts] = useState([]);

	// const getPosts = async () => {
	// 	const postsData = await getDocs(collection(db, "posts"));
	// 	const posts = postsData.docs.map((doc) => doc.data());
	// 	setPosts(posts);
	// };

	useEffect(() => {
		onSnapshot(q, (querySnapshot) => {
			const posts = [];
			querySnapshot.forEach((doc) => {
				posts.push({ id: doc.id, data: doc.data() });
			});
			setPosts(posts);
		});
	}, []);

	useEffect(() => {
		console.log(posts);
		// window.scrollTo({ top: 0, behavior: "smooth" });
	}, [posts]);

	return (
		<main>
			<PostsContainer posts={posts} />
		</main>
	);
};

export default protectedRoute(Home);
