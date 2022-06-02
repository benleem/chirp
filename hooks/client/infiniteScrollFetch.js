import {
	query,
	collection,
	orderBy,
	limit,
	getDocs,
	startAfter,
	getDoc,
	doc,
	where,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const infiniteScrollFetch = async (latestPostId, location, uid) => {
	const latestPostQuery = query(doc(db, `posts/${latestPostId}`));
	const latestPost = await getDoc(latestPostQuery);

	switch (location) {
		case "/home":
			const postsQuery = query(
				collection(db, "posts"),
				orderBy("timeStamp", "desc"),
				startAfter(latestPost),
				limit(5)
			);
			const posts = [];
			const postsData = await getDocs(postsQuery);
			postsData.docs.map((doc) => posts.push({ id: doc.id, data: doc.data() }));

			return posts;
		case "/[profile]":
			const profileQuery = query(
				collection(db, "posts"),
				where("userId", "==", uid),
				orderBy("timeStamp", "desc"),
				startAfter(latestPost),
				limit(5)
			);
			const userPostsData = await getDocs(profileQuery);
			const userPosts = userPostsData.docs.map((doc) => {
				return { id: doc.id, data: doc.data() };
			});

			return userPosts;
	}
};
