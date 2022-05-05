import { useEffect, useState } from "react";
import { query, doc, onSnapshot } from "firebase/firestore";

import { db } from "../firebase/firebaseConfig";
import { verifyToken } from "../hooks/server/verifyToken";
import { getUserData } from "../hooks/server/getUserData";
import { getPosts } from "../hooks/server/getPosts";

import NoPosts from "../components/Errors/NoPosts";
import PostsContainer from "../components/Feed/PostsContainer";

export const getServerSideProps = async (context) => {
	try {
		const uid = await verifyToken(context);

		try {
			const posts = await getPosts();
			const userData = await getUserData(uid);

			return {
				props: {
					posts,
					uid,
					initialFavorites: userData.favorites,
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

const Home = ({ posts, error, uid, initialFavorites }) => {
	const [favorites, setFavorites] = useState(initialFavorites);
	console.log(error, posts);

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

	const ControlErrors = () => {
		if (error) {
			return <p>Something went wrong...</p>;
		} else if (posts.length === 0) {
			return <NoPosts />;
		} else {
			return <PostsContainer posts={posts} favorites={favorites} />;
		}
	};

	return <ControlErrors />;
};

export default Home;
