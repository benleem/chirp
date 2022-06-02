import {
	query,
	collection,
	where,
	limit,
	getDocs,
	orderBy,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const getUserPosts = async (uid) => {
	const postsQuery = query(
		collection(db, "posts"),
		where("userId", "==", uid),
		orderBy("timeStamp", "desc"),
		limit(10)
	);
	const postsData = await getDocs(postsQuery);
	const posts = postsData.docs.map((doc) => {
		return { id: doc.id, data: doc.data() };
	});

	return posts;
};
