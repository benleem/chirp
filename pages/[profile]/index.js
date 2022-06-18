import { useEffect, useState } from "react";

import { verifyToken } from "../../hooks/server/verifyToken";
import { getUserData } from "../../hooks/server/getUserData";
import { getUserPosts } from "../../hooks/server/getUserPosts";
import { getFavorited } from "../../hooks/server/getFavorited";

import MainLayout from "../../components/Layouts/MainLayout";
import FeedLayout from "../../components/Layouts/FeedLayout";
import NoPosts from "../../components/NoPosts";
import PostsContainer from "../../components/Feed/PostsContainer";
import UserCard from "../../components/UserCard";

export const getServerSideProps = async (context) => {
	try {
		const { uid } = await verifyToken(context);
		const profileId = context.params.profile;

		try {
			const profileData = await getUserData(profileId);
			const initialFavorites = await getFavorited(uid);

			if (profileData) {
				const profilePosts = await getUserPosts(profileId);

				return {
					props: {
						uid,
						initialFavorites,
						profileData,
						profileId,
						profilePosts,
					},
				};
			} else {
				return { props: { profileData: null } };
			}
		} catch (error) {
			return { props: { error: error.message } };
		}
	} catch (err) {
		context.res.writeHead(302, { Location: "/" });
		context.res.end();
		return { props: {} };
	}
};

const Profile = ({
	uid,
	initialFavorites,
	profileData,
	profileId,
	profilePosts,
	error,
}) => {
	const [favorites, setFavorites] = useState(initialFavorites);
	const [posts, setPosts] = useState(profilePosts);
	const [checkHasMore, setCheckHasMore] = useState(true);

	const CheckUser = () => {
		if (uid === profileId) {
			return <UserCard renderButton={true} />;
		} else {
			return <UserCard profileData={profileData} renderButton={false} />;
		}
	};

	useEffect(() => {
		setPosts(profilePosts);
		setCheckHasMore(true);
	}, [profilePosts]);

	const ControlErrors = () => {
		if (error) {
			return <p>Something went wrong...</p>;
		} else if (profileData === null) {
			return <p>This page doesn't exist</p>;
		} else if (posts.length < 1) {
			return (
				<>
					<NoPosts profileData={profileData} />
					<CheckUser />
				</>
			);
		} else {
			return (
				<>
					<PostsContainer
						uid={profileId}
						posts={posts}
						setPosts={setPosts}
						favorites={favorites}
						setFavorites={setFavorites}
						checkHasMore={checkHasMore}
						setCheckHasMore={setCheckHasMore}
					/>
					<CheckUser />
				</>
			);
		}
	};

	return <ControlErrors />;
};

Profile.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<FeedLayout>{page}</FeedLayout>
		</MainLayout>
	);
};

export default Profile;
