import { useEffect } from "react";
import {
	getDocs,
	getDoc,
	collection,
	query,
	orderBy,
	doc,
} from "firebase/firestore";
import nookies from "nookies";

import { adminAuth } from "../firebase/firebaseAdmin";
import { db } from "../firebase/firebaseConfig";

import PostsContainer from "../components/Feed/PostsContainer";

export const getServerSideProps = async (context) => {
	try {
		const cookies = nookies.get(context);
		const token = await adminAuth.verifyIdToken(cookies.token);
		const { uid } = token;

		const postsQuery = query(
			collection(db, "posts"),
			orderBy("timeStamp", "desc")
		);
		const posts = [];
		const postsData = await getDocs(postsQuery);
		postsData.docs.map((doc) => posts.push({ id: doc.id, data: doc.data() }));

		const userQuery = query(doc(db, `users/${uid}`));
		const favoritesData = (await getDoc(userQuery)).data();

		return {
			props: { posts, favorites: favoritesData.favorites },
		};
	} catch (err) {
		// context.res.writeHead(302, { Location: "/auth" });
		// context.res.end();
		return { props: { error: err.message } };
	}
};

const Home = ({ posts, favorites, error }) => {
	// useEffect(() => {
	// 	onSnapshot(q, (querySnapshot) => {
	// 		const posts = [];
	// 		querySnapshot.forEach((doc) => {
	// 			posts.push({ id: doc.id, data: doc.data() });
	// 		});
	// 		setPosts(posts);
	// 	});
	// }, []);

	useEffect(() => {
		// console.log(token);
		console.log(favorites);
		console.log(error);
	}, []);

	return (
		<main>
			<PostsContainer posts={posts} />
		</main>
	);
};

export default Home;
