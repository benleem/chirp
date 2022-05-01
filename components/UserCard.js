import { useEffect } from "react";
import Image from "next/image";

import { useAuth } from "../hooks/useAuth";

import styles from "../styles/UserCard.module.css";

const UserCard = () => {
	const user = useAuth();

	useEffect(() => {
		console.log(user);
		console.log(user?.metadata.createdAt);
	}, [user]);

	return (
		<div className={styles.userCardContainer}>
			<div className={styles.userCard}>
				<div className={styles.cardTop}>
					<div className={styles.backgroundWrapper}>
						<Image
							src="/img/sample-background.jpg"
							alt="User background"
							layout="responsive"
							width={400}
							height={200}
							objectFit="cover"
						/>
					</div>
				</div>
				<div className={styles.cardBottom}>
					<div className={styles.userImgRow}>
						<div className={styles.imgWrapper}>
							<Image
								src="/img/sample-profile.jpeg"
								alt="User picture"
								layout="fixed"
								width="75px"
								height="75px"
								objectFit="cover"
							/>
						</div>
					</div>
					<div className={styles.userDetails}>
						<p className={styles.displayName}>{user?.displayName}</p>
						<p className={styles.description}>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aliquam
							ut libero nec risus blandit auctor id sed quam. Ut ac libero ex.
							Nam eleifend tincidunt luctus
						</p>
						<p className={styles.joined}>Joined {user?.metadata.createdAt} </p>
						<div className={styles.userActivity}>
							<p className={styles.favorites}>Favorites: 4</p>
							<p className={styles.posts}>Posts: 12</p>
						</div>
						<button className={styles.editButton}>Edit profile</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
