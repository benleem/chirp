import { useEffect } from "react";
import nookies from "nookies";
import {
	getDocs,
	getDoc,
	collection,
	query,
	doc,
	where,
	documentId,
	orderBy,
} from "firebase/firestore";

import { adminAuth } from "../firebase/firebaseAdmin";
import { db } from "../firebase/firebaseConfig";

import PostsContainer from "../components/Feed/PostsContainer";
import FavoriteDeleted from "../components/Favorited/FavoriteDeleted";

export const getServerSideProps = async (context) => {
	try {
		const cookies = nookies.get(context);
		const token = await adminAuth.verifyIdToken(cookies.token);
		const { uid } = token;

		try {
			const userQuery = query(doc(db, `users/${uid}`));
			const favoritesData = (await getDoc(userQuery)).data();
			const favoriteIds = favoritesData.favorites;

			const posts = [];
			const postsQuery = query(
				collection(db, "posts"),
				where(documentId(), "in", favoriteIds)
			);
			const postsData = await getDocs(postsQuery);
			postsData.docs.map((doc) => posts.push({ id: doc.id, data: doc.data() }));

			return { props: { favorites: favoriteIds, posts } };
		} catch (error) {
			return { props: { error: error.message } };
		}
	} catch (err) {
		context.res.writeHead(302, { Location: "/auth" });
		context.res.end();
		return { props: {} };
	}
};

const Favorited = ({ error, posts, favorites }) => {
	return (
		<main>
			{posts.length < favorites.length ? (
				<FavoriteDeleted posts={posts} />
			) : null}
			<PostsContainer posts={posts} favorites={favorites} />
		</main>
	);
};

export default Favorited;
