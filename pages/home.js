import { useEffect, useState } from "react";

import { verifyToken } from "../hooks/server/verifyToken";
import { getPosts } from "../hooks/server/getPosts";
import { getFavorited } from "../hooks/server/getFavorited";
import { checkFavorites } from "../hooks/client/checkFavorites";

import Head from "next/head";
import MainLayout from "../components/Layouts/MainLayout";
import FeedLayout from "../components/Layouts/FeedLayout";
import NoPosts from "../components/PageErrors/NoPosts";
import PostsContainer from "../components/Feed/PostsContainer";
import SyncFavorites from "../components/Feed/SyncFavorites";

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
	const [deletedFavorites, setDeletedFavorites] = useState([]);

	const ControlErrors = () => {
		if (error || posts.length < 1) {
			return <NoPosts />;
		} else {
			return (
				<>
					<SyncFavorites
						uid={uid}
						favorites={favorites}
						setFavorites={setFavorites}
						deletedFavorites={deletedFavorites}
						setDeletedFavorites={setDeletedFavorites}
					/>
					<PostsContainer
						uid={uid}
						posts={posts}
						setPosts={setPosts}
						favorites={favorites}
						setFavorites={setFavorites}
						checkHasMore={checkHasMore}
						setCheckHasMore={setCheckHasMore}
					/>
				</>
			);
		}
	};

	useEffect(() => {
		setPosts(initialPosts);
		setCheckHasMore(true);
	}, [initialPosts]);

	useEffect(() => {
		checkFavorites(favorites, setDeletedFavorites);
	}, []);

	return (
		<>
			<Head>
				<title>Home - Chirp</title>
				<meta
					name="description"
					content="Explore what everyone's saying on Chirp"
				/>
			</Head>
			<ControlErrors />
		</>
	);
};

Home.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<FeedLayout>{page}</FeedLayout>
		</MainLayout>
	);
};

export default Home;
