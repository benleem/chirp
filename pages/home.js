import { useEffect, useState } from "react";

import { verifyToken } from "../hooks/server/verifyToken";
import { getPosts } from "../hooks/server/getPosts";

import MainLayout from "../components/Layouts/MainLayout";
import FeedLayout from "../components/Layouts/FeedLayout";
import NoPosts from "../components/PageErrors/NoPosts";
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
	const [favorites, setFavorites] = useState(initialFavorites);
	const [posts, setPosts] = useState(initialPosts);
	const [checkHasMore, setCheckHasMore] = useState(true);

	useEffect(() => {
		setPosts(initialPosts);
		setCheckHasMore(true);
	}, [initialPosts]);

	const ControlErrors = () => {
		if (error || posts.length < 1) {
			return <NoPosts />;
		} else {
			return (
				<PostsContainer
					uid={uid}
					posts={posts}
					setPosts={setPosts}
					favorites={favorites}
					setFavorites={setFavorites}
					checkHasMore={checkHasMore}
					setCheckHasMore={setCheckHasMore}
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
