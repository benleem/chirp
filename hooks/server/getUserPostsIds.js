import { query, collection, getDocs } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const getUserPostsIds = async (uid) => {
	const postsQuery = query(collection(db, `users/${uid}/posts`));
	const postsData = await getDocs(postsQuery);
	const posts = postsData.docs.map((doc) => {
		return doc.data();
	});
	const postsArray = posts.map((post) => {
		return post.postId;
	});

	return postsArray;
};
