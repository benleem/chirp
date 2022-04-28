import { useEffect, useState } from "react";
import {
	getDocs,
	getDoc,
	collection,
	query,
	orderBy,
	doc,
	onSnapshot,
} from "firebase/firestore";
import nookies from "nookies";

import { adminAuth } from "../firebase/firebaseAdmin";
import { db } from "../firebase/firebaseConfig";

import PostsContainer from "../components/Feed/PostsContainer";
import { useAuth } from "../hooks/useAuth";

export const getServerSideProps = async (context) => {
	try {
		const cookies = nookies.get(context);
		const token = await adminAuth.verifyIdToken(cookies.token);
		const { uid } = token;

		if (token) {
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
				props: { posts, uid, initialFavorites: favoritesData },
			};
		} else {
			return { props: {} };
		}
	} catch (err) {
		context.res.writeHead(301, { Location: "/auth" });
		context.res.end();
		return { props: { error: err.message } };
	}
};

const Home = ({ posts, error, uid, initialFavorites }) => {
	const [favorites, setFavorites] = useState([initialFavorites]);

	const getFavorites = async () => {
		const userQuery = query(doc(db, `users/${uid}`));
		onSnapshot(userQuery, (doc) => {
			const userInfo = doc.data();
			const favorites = userInfo.favorites;
			setFavorites(favorites);
		});
	};

	useEffect(() => {
		getFavorites();
	}, []);

	return (
		<main>
			<PostsContainer posts={posts} favorites={favorites} />
		</main>
	);
};

export default Home;
