import { doc, getDoc, query } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

export const checkFavorites = (favorites, setDeletedFavorites) => {
	const queuedFavorites = [];
	favorites.forEach(async (favorite) => {
		const postQuery = query(doc(db, `posts/${favorite}`));
		try {
			const currentFavorite = await getDoc(postQuery);
			if (currentFavorite.data() === undefined) {
				queuedFavorites.push(favorite);
				setDeletedFavorites(queuedFavorites);
			}
		} catch (error) {
			console.log(error);
		}
	});
};
