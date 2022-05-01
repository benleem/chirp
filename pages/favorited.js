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
	limit,
} from "firebase/firestore";

import { adminAuth } from "../firebase/firebaseAdmin";
import { db } from "../firebase/firebaseConfig";

import PostsContainer from "../components/Feed/PostsContainer";
import NoFavorites from "../components/Favorited/NoFavorites";
import FavoriteDeleted from "../components/Favorited/FavoriteDeleted";
import UserCard from "../components/UserCard";

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
				where(documentId(), "in", favoriteIds),
				limit(10)
			);
			const postsData = await getDocs(postsQuery);
			postsData.docs.map((doc) => posts.push({ id: doc.id, data: doc.data() }));
			const orderedPosts = posts.sort(
				(a, b) => b.data.timeStamp - a.data.timeStamp
			);

			return { props: { favorites: favoriteIds, posts: orderedPosts } };
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
	const CheckFavorites = () => {
		if (posts === undefined) {
			return (
				<main>
					<NoFavorites />
					<UserCard />
				</main>
			);
		} else if (favorites.length > posts.length && posts.length === 0) {
			return (
				<>
					<FavoriteDeleted posts={posts} />
					<main>
						<NoFavorites />
						<UserCard />
					</main>
				</>
			);
		} else if (favorites.length > posts.length) {
			return (
				<>
					<FavoriteDeleted posts={posts} />
					<main>
						<PostsContainer posts={posts} favorites={favorites} />
						<UserCard />
					</main>
				</>
			);
		} else {
			return (
				<main>
					<PostsContainer posts={posts} favorites={favorites} />
					<UserCard />
				</main>
			);
		}
	};

	return (
		<>
			<CheckFavorites />
		</>
	);
};

export default Favorited;
