import { db } from "../firebase/firebaseConfig";
import { verifyToken } from "../hooks/server/verifyToken";
import { getUserData } from "../hooks/server/getUserData";
import { getFavoritedPosts } from "../hooks/server/getFavoritedPosts";

import MainLayout from "../components/Layouts/MainLayout";
import FeedLayout from "../components/Layouts/FeedLayout";
import PostsContainer from "../components/Feed/PostsContainer";
import NoPosts from "../components/Errors/NoPosts";
import FavoriteDeleted from "../components/Favorited/FavoriteDeleted";
import UserCard from "../components/UserCard";

export const getServerSideProps = async (context) => {
	try {
		const { uid } = await verifyToken(context);

		try {
			const userData = await getUserData(uid);
			const favoriteIds = userData.favorites;

			if (favoriteIds.length > 0) {
				const posts = await getFavoritedPosts(favoriteIds);
				return { props: { favorites: favoriteIds, posts } };
			}

			return { props: { favorites: favoriteIds, posts: null } };
		} catch (error) {
			return { props: { error: error.message } };
		}
	} catch (err) {
		context.res.writeHead(302, { Location: "/" });
		context.res.end();
		return { props: {} };
	}
};

const Favorited = ({ error, posts, favorites }) => {
	const ControlErrors = () => {
		if (error) {
			return <p>Something went wrong</p>;
		} else if (favorites.length === 0 && posts === null) {
			return (
				<>
					<NoPosts />
				</>
			);
		} else if (favorites.length > posts.length && posts.length === 0) {
			return (
				<>
					<FavoriteDeleted posts={posts} />
					<NoPosts />
				</>
			);
		} else if (favorites.length > posts.length) {
			return (
				<>
					<FavoriteDeleted posts={posts} />
					<PostsContainer posts={posts} favorites={favorites} />
				</>
			);
		} else {
			return <PostsContainer posts={posts} favorites={favorites} />;
		}
	};

	return <ControlErrors />;
};

Favorited.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<FeedLayout>{page}</FeedLayout>
		</MainLayout>
	);
};

export default Favorited;
