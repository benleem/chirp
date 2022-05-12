import { useEffect, useState } from "react";
import { query, doc, onSnapshot } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";
import { verifyToken } from "../../hooks/server/verifyToken";
import { getUserData } from "../../hooks/server/getUserData";
import { getUserPosts } from "../../hooks/server/getUserPosts";

import MainLayout from "../../components/Layouts/MainLayout";
import FeedLayout from "../../components/Layouts/FeedLayout";
import NoPosts from "../../components/Errors/NoPosts";
import PostsContainer from "../../components/Feed/PostsContainer";
import UserCard from "../../components/UserCard";

export const getServerSideProps = async (context) => {
	try {
		const uid = await verifyToken(context);
		const profileId = context.params.profile;

		try {
			const profileData = await getUserData(profileId);
			const userData = await getUserData(uid);
			const initialFavorites = userData.favorites;

			if (profileData && profileData.posts.length > 0) {
				const profilePosts = await getUserPosts(profileData);

				return {
					props: {
						uid,
						initialFavorites,
						profileData,
						profileId,
						profilePosts,
					},
				};
			} else if (profileData && profileData.posts.length < 1) {
				return {
					props: {
						uid,
						initialFavorites,
						profileData,
						profileId,
						profilePosts: [],
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

	const getFavorites = async () => {
		const userQuery = query(doc(db, `users/${uid}`));

		onSnapshot(userQuery, (doc) => {
			const userInfo = doc.data();
			const favorites = userInfo.favorites;
			setFavorites(favorites);
		});
	};

	useEffect(() => {
		if (favorites) {
			getFavorites();
		}
	}, []);

	const ControlErrors = () => {
		if (error) {
			return <p>Something went wrong...</p>;
		} else if (profileData === null) {
			return <p>This page doesn't exist</p>;
		} else if (profilePosts.length < 1) {
			return (
				<>
					<NoPosts profileData={profileData} />
					<UserCard profileData={profileData} renderButton={true} />
				</>
			);
		} else {
			return (
				<>
					<PostsContainer posts={profilePosts} favorites={favorites} />
					{uid === profileId ? (
						<UserCard renderButton={true} />
					) : (
						<UserCard profileData={profileData} renderButton={false} />
					)}
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
