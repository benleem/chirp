import { query, collection, orderBy, limit, getDocs } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const getPosts = async () => {
	const postsQuery = query(
		collection(db, "posts"),
		orderBy("timeStamp", "desc"),
		limit(10)
	);
	const posts = [];
	const postsData = await getDocs(postsQuery);
	postsData.docs.map((doc) => posts.push({ id: doc.id, data: doc.data() }));

	return posts;
};
