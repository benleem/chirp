import {
	query,
	collection,
	orderBy,
	limit,
	getDocs,
	Timestamp,
	serverTimestamp,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const getPosts = async () => {
	const postsQuery = query(
		collection(db, "posts"),
		orderBy("timeStamp", "desc"),
		limit(10)
	);
	const posts = [];
	const postsData = await getDocs(postsQuery);
	postsData.docs.forEach((doc) => posts.push({ id: doc.id, data: doc.data() }));

	const newPosts = posts.map((post) => {
		let date = new Date(post.data.timeStamp);
		let time = date.toLocaleTimeString("en-US", {
			timeZoneName: "short",
			hour12: "true",
			hour: "2-digit",
			minute: "2-digit",
			weekday: "short",
			month: "long",
			day: "numeric",
			year: "numeric",
		});
		post.data.timeStamp = time;
		return post;
	});

	return newPosts;
};
