import {
	query,
	collection,
	where,
	orderBy,
	onSnapshot,
} from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const liveFavorites = async (uid, setFavorites) => {
	const favoritesQuery = query(
		collection(db, "favorites"),
		where("userId", "==", uid),
		orderBy("timeStamp", "desc")
	);

	onSnapshot(favoritesQuery, (querySnapshot) => {
		const favorites = [];
		querySnapshot.forEach((doc) => {
			favorites.push({ id: doc.id, data: doc.data() });
		});
		const favoriteObject = {
			favoritesData: favorites,
			favoritePostIds: favorites.map((favorite) => {
				return favorite.data.postId;
			}),
		};
		setFavorites(favoriteObject);
	});
};
