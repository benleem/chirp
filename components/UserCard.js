import { useEffect } from "react";
import Image from "next/image";

import { useUser } from "../hooks/useUser";

import styles from "../styles/UserCard.module.css";

const UserCard = () => {
	const userInfo = useUser();

	const ConvertTime = () => {
		let date = new Date(userInfo?.createdAt);
		let time = date.toLocaleDateString("en-US", {
			month: "long",
			day: "numeric",
			year: "numeric",
		});

		return <p className={styles.joined}>Joined: {time}</p>;
	};

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
							{userInfo ? (
								<Image
									src={userInfo.imgUrl}
									alt="User picture"
									layout="fixed"
									width="75px"
									height="75px"
									objectFit="cover"
								/>
							) : null}
						</div>
					</div>
					<div className={styles.userDetails}>
						<p className={styles.displayName}>
							<span className={styles.symbol}>@</span>
							{userInfo?.displayName}
						</p>
						{userInfo?.description ? (
							<p className={styles.description}>{userInfo?.description}</p>
						) : null}
						<ConvertTime />
						<div className={styles.userActivity}>
							<p className={styles.favorites}>
								Favorited: {userInfo?.favorites.length}
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
