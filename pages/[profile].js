import { useRouter } from "next/router";
import { useState } from "react";
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

import ProfileHeader from "../components/Profile/ProfileHeader";
import PostsContainer from "../components/Feed/PostsContainer";

export const getServerSideProps = async (context) => {
	try {
		const cookies = nookies.get(context);
		const token = await adminAuth.verifyIdToken(cookies.token);
		const { uid } = token;

		const profileid = context.params.profile;

		try {
			// get user data
			const userQuery = query(doc(db, `users/${profileid}`));
			const userData = (await getDoc(userQuery)).data();

			if (userData) {
				//get user posts
				const posts = [];
				const postsQuery = query(
					collection(db, "posts"),
					where(documentId(), "in", userData.posts),
					limit(10)
				);
				const postsData = await getDocs(postsQuery);
				postsData.docs.map((doc) =>
					posts.push({ id: doc.id, data: doc.data() })
				);
				const orderedPosts = posts.sort(
					(a, b) => b.data.timeStamp - a.data.timeStamp
				);

				// get user favorites

				// get user commments
				return { props: { userData, userPosts: orderedPosts } };
			} else {
				return { props: { userData: null } };
			}

			// const posts = [];
			// const postsQuery = query(
			// 	collection(db, "posts"),
			// 	where(documentId(), "in", favoriteIds),
			// 	limit(10)
			// );
			// const postsData = await getDocs(postsQuery);
			// postsData.docs.map((doc) => posts.push({ id: doc.id, data: doc.data() }));
			// const orderedPosts = posts.sort(
			// 	(a, b) => b.data.timeStamp - a.data.timeStamp
			// );
		} catch (error) {
			return { props: { error: error.message } };
		}
	} catch (err) {
		context.res.writeHead(302, { Location: "/" });
		context.res.end();
		return { props: {} };
	}
};

const Profile = ({ userData, error, userPosts }) => {
	console.log(userData, error);

	const [view, setView] = useState("posts");

	const ControlErrors = () => {
		if (error && userData === undefined) {
			return <p>Something went wrong...</p>;
		} else if (userData === null && error === undefined) {
			return <p>This page doesn't exist</p>;
		} else {
			return (
				<>
					<ProfileHeader userData={userData} setView={setView} />
					<main>
						<ControlView />
					</main>
				</>
			);
		}
	};

	const ControlView = () => {
		switch (view) {
			case "posts":
				return (
					<PostsContainer posts={userPosts} favorites={userData.favorites} />
				);
			case "comments":
				return <p>This is the comments view</p>;
			case "favorites":
				return <p>This is the favorites view</p>;
			default:
				return (
					<PostsContainer posts={userPosts} favorites={userData.favorites} />
				);
		}
	};

	return <ControlErrors />;
};

export default Profile;
