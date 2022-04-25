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
import nookies from "nookies";

import { adminAuth } from "../firebase/firebaseAdmin";
import { db } from "../firebase/firebaseConfig";

import PostsContainer from "../components/Feed/PostsContainer";

export const getServerSideProps = async (context) => {
	try {
		const cookies = nookies.get(context);
		const token = await adminAuth.verifyIdToken(cookies.token);

		// FETCH STUFF HERE!! 🚀

		return {
			props: { token },
		};
	} catch (err) {
		context.res.writeHead(302, { Location: "/auth" });
		context.res.end();
		return { props: {} };
	}
};

const Home = ({ token }) => {
	// const q = query(collection(db, "posts"), orderBy("timeStamp", "desc"));

	// const [posts, setPosts] = useState([]);

	// const getPosts = async () => {
	// 	const postsData = await getDocs(collection(db, "posts"));
	// 	const posts = postsData.docs.map((doc) => doc.data());
	// 	setPosts(posts);
	// };

	// useEffect(() => {
	// 	onSnapshot(q, (querySnapshot) => {
	// 		const posts = [];
	// 		querySnapshot.forEach((doc) => {
	// 			posts.push({ id: doc.id, data: doc.data() });
	// 		});
	// 		setPosts(posts);
	// 	});
	// }, []);

	// useEffect(() => {
	// 	console.log(posts);
	// 	// window.scrollTo({ top: 0, behavior: "smooth" });
	// }, [posts]);

	return <main>{/* <PostsContainer posts={posts} /> */}</main>;
};

export default Home;
