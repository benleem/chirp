import { query, collection, where, getDocs, orderBy } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const getFavorited = async (uid) => {
	const favoritesQuery = query(
		collection(db, "favorites"),
		where("userId", "==", uid)
	);

	const favoritesData = await getDocs(favoritesQuery);
	const favorites = favoritesData.docs.map((doc) => {
		return { id: doc.id, data: doc.data() };
	});

	const favoritesObject = {
		favoritesData: favorites,
		favoritePostIds: favorites.map((favorite) => {
			return favorite.data.postId;
		}),
	};

	return favoritesObject;
};
