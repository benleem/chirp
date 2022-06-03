import { query, collection, where, getDocs, orderBy } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const getFavorited = async (uid) => {
	const favoritesQuery = query(
		collection(db, `users/${uid}/favorites`),
		orderBy("timeStamp", "desc")
	);

	const favoritesData = await getDocs(favoritesQuery);
	const favorites = favoritesData.docs.map((doc) => {
		return doc.data();
	});
	const favoritesNoTimestamp = favorites.map((favorite) => {
		return favorite.postId;
	});

	return favoritesNoTimestamp;
};
