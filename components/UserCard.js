import { useEffect } from "react";
import Image from "next/image";

import { useAuth } from "../hooks/useAuth";
import { useUser } from "../hooks/useUser";

import styles from "../styles/UserCard.module.css";

const UserCard = () => {
	const user = useAuth();
	const userInfo = useUser();

	const ConvertTime = () => {
		let date = new Date(user?.metadata.creationTime);
		let time = date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

		return <p className={styles.joined}>Joined: {time}</p>;
	};

	useEffect(() => {
		console.log(user);
		console.log(user?.metadata);
	}, [user]);

	// useEffect(() => {
	// 	console.log(userInfo);
	// }, [userInfo]);

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
						<p className={styles.description}>{userInfo?.description}</p>
						<ConvertTime />
						<div className={styles.userActivity}>
							<p className={styles.favorites}>
								Favorites: {userInfo?.favorites.length}
							</p>
							<p className={styles.posts}>Posts: {userInfo?.posts.length}</p>
						</div>
						<button className={styles.editButton}>Edit profile</button>
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
