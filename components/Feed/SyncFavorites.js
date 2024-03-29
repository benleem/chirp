import { deleteDoc, updateDoc, doc, increment } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";

import styles from "../../styles/Feed/SyncFavorites.module.css";

const SyncFavorites = ({
	uid,
	favorites,
	setFavorites,
	deletedFavorites,
	setDeletedFavorites,
}) => {
	const deleteFavorites = () => {
		if (deletedFavorites.length >= 1) {
			// const batchedFavorites = splitArray(deletedFavorites, 10);
			const newFavorites = favorites.filter(
				(favorite) => !deletedFavorites.includes(favorite)
			);
			const newDeletedFavorites = deletedFavorites.filter(
				(favorite) => !deletedFavorites.includes(favorite)
			);
			deletedFavorites.forEach(async (favorite) => {
				const userRef = doc(db, `users/${uid}`);
				const favoriteRef = doc(db, `users/${uid}/favorites/${favorite}`);

				try {
					await deleteDoc(favoriteRef);
					await updateDoc(userRef, {
						favorites: increment(-1),
					});
					setDeletedFavorites(newDeletedFavorites);
					setFavorites(newFavorites);
				} catch (error) {
					console.log(error);
				}
			});
		}
	};

	return (
		<>
			{deletedFavorites.length >= 1 ? (
				<div className={styles.syncFavorites}>
					<p className={styles.syncText}>
						Your favorites are out of sync due to one or more being deleted
					</p>
					<button className={styles.syncButton} onClick={deleteFavorites}>
						Update
					</button>
				</div>
			) : null}
		</>
	);
};

export default SyncFavorites;
