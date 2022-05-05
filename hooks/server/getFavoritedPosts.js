import {
	query,
	collection,
	where,
	documentId,
	limit,
	getDocs,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const getFavoritedPosts = async (favoriteIds) => {
	const posts = [];
	const postsQuery = query(
		collection(db, "posts"),
		where(documentId(), "in", favoriteIds),
		limit(10)
	);
	const postsData = await getDocs(postsQuery);
	postsData.docs.map((doc) => posts.push({ id: doc.id, data: doc.data() }));
	const orderedPosts = posts.sort(
		(a, b) => b.data.timeStamp - a.data.timeStamp
	);

	return orderedPosts;
};
