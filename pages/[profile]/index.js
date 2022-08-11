import { useEffect, useState } from "react";
import Error from "next/error";

import { verifyToken } from "../../hooks/server/verifyToken";
import { getUserData } from "../../hooks/server/getUserData";
import { getUserPosts } from "../../hooks/server/getUserPosts";
import { getFavorited } from "../../hooks/server/getFavorited";

import Head from "next/head";
import MainLayout from "../../components/Layouts/MainLayout";
import FeedLayout from "../../components/Layouts/FeedLayout";
import NoPosts from "../../components/PageErrors/NoPosts";
import PageError from "../../components/PageErrors/PageError";
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

	const ControlErrors = () => {
		if (error) {
			return (
				<PageError
					title="Something went wrong"
					text="A network request couldn't be completed. Return home or refresh the page."
				/>
			);
		} else if (profileData === null) {
			return (
				<PageError
					title="Page not found"
					text="Sorry, we couldn't find that page. Return home or change the url."
				/>
			);
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

	useEffect(() => {
		setPosts(profilePosts);
		setCheckHasMore(true);
		console.log(profileData);
	}, [profilePosts]);

	return (
		<>
			<Head>
				<title>@{profileData.displayName} - Chirp</title>
				<meta
					name="description"
					content={
						profileData.description
							? `${profileData.description}`
							: `See what ${profileData.displayName} has been up to`
					}
				/>
			</Head>
			<ControlErrors />
		</>
	);
};

Profile.getLayout = function getLayout(page) {
	return (
		<MainLayout>
			<FeedLayout>{page}</FeedLayout>
		</MainLayout>
	);
};

export default Profile;
