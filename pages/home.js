import { useEffect, useState } from "react";
import {
	getDocs,
	getDoc,
	collection,
	query,
	orderBy,
	doc,
	onSnapshot,
	limit,
} from "firebase/firestore";
import nookies from "nookies";

import { adminAuth } from "../firebase/firebaseAdmin";
import { db } from "../firebase/firebaseConfig";

import PostsContainer from "../components/Feed/PostsContainer";
import UserCard from "../components/UserCard";

export const getServerSideProps = async (context) => {
	try {
		const cookies = nookies.get(context);
		const token = await adminAuth.verifyIdToken(cookies.token);
		const { uid } = token;

		try {
			const postsQuery = query(
				collection(db, "posts"),
				orderBy("timeStamp", "desc"),
				limit(10)
			);
			const posts = [];
			const postsData = await getDocs(postsQuery);
			postsData.docs.map((doc) => posts.push({ id: doc.id, data: doc.data() }));

			const userQuery = query(doc(db, `users/${uid}`));
			const favoritesData = (await getDoc(userQuery)).data();

			return {
				props: {
					posts,
					uid,
					initialFavorites: favoritesData.favorites,
				},
			};
		} catch (error) {
			return {
				props: { error: error.message },
			};
		}
	} catch (err) {
		context.res.writeHead(302, { Location: "/" });
		context.res.end();
		return { props: {} };
	}
};

const home = ({ posts, error, uid, initialFavorites }) => {
	const [favorites, setFavorites] = useState(initialFavorites);

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
			<UserCard />
		</main>
	);
};

export default home;
