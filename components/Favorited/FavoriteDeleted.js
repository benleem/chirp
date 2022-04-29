import { useRouter } from "next/router";
import { doc, updateDoc } from "firebase/firestore";

import { db } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/useAuth";

import styles from "../../styles/Favorited/FavoriteDeleted.module.css";

const FavoriteDeleted = ({ posts }) => {
	const user = useAuth();
	const router = useRouter();

	const handleClick = async () => {
		const userRef = doc(db, `users/${user.uid}`);
		const updatedFavorites = posts.map((post) => {
			return post.id;
		});
		await updateDoc(userRef, {
			favorites: updatedFavorites,
		});
		await router.replace(router.asPath);
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div className={styles.favoriteDeleted}>
			<p className={styles.deleteText}>
				One or more of your favorited posts has been deleted, click{" "}
				<button className={styles.deleteButton} onClick={handleClick}>
					here
				</button>{" "}
				to delete them from your favorites
			</p>
		</div>
	);
};

export default FavoriteDeleted;
