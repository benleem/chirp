import { useEffect, useState } from "react";

import { verifyToken } from "../hooks/server/verifyToken";
import { getPosts } from "../hooks/server/getPosts";

import MainLayout from "../components/Layouts/MainLayout";
import FeedLayout from "../components/Layouts/FeedLayout";
import NoPosts from "../components/NoPosts";
import PostsContainer from "../components/Feed/PostsContainer";
import { getFavorited } from "../hooks/server/getFavorited";

export const getServerSideProps = async (context) => {
	try {
		const { uid } = await verifyToken(context);

		try {
			const initialPosts = await getPosts();
			const favorites = await getFavorited(uid);

			return {
				props: {
					initialPosts,
					uid,
					initialFavorites: favorites,
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

const Home = ({ initialPosts, error, uid, initialFavorites }) => {
	const [posts, setPosts] = useState(initialPosts);
	const [favorites, setFavorites] = useState(initialFavorites);

	useEffect(() => {
		setPosts(initialPosts);
	}, [initialPosts]);

	const ControlErrors = () => {
		if (error) {
			return <p>Something went wrong...</p>;
		} else if (posts.length === 0) {
			return <NoPosts />;
		} else {
			return (
				<PostsContainer
					posts={posts}
					setPosts={setPosts}
					favorites={favorites}
					setFavorites={setFavorites}
				/>
			);
		}
	};

	return <ControlErrors />;
};

Home.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<FeedLayout>{page}</FeedLayout>
		</MainLayout>
	);
};

export default Home;
