import { useAuth } from "../hooks/useAuth";

import styles from "../styles/UserCard.module.css";

const UserCard = () => {
	const user = useAuth();
	console.log(user);

	return (
		<div className={styles.userCardContainer}>
			<div className={styles.userCard}>
				<img src="/img/search.svg" alt="" />
				<p>{user?.displayName}</p>
			</div>
		</div>
	);
};

export default UserCard;
