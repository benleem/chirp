import { useEffect } from "react";
import { Router, useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

import { useUser } from "../hooks/client/useUser";
import { useAuth } from "../hooks/client/useAuth";
import ActionButton from "./FormState/ActionButton";

import styles from "../styles/UserCard.module.css";

const UserCard = ({ profileData, renderButton }) => {
	const router = useRouter();

	const checkUserInfo = () => {
		if (profileData) {
			return profileData;
		} else {
			return useUser();
		}
	};
	const userInfo = checkUserInfo();
	const user = useAuth();

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
		<div
			className={
				router.route === "/[profile]/edit"
					? styles.userCardContainerPreview
					: styles.userCardContainer
			}
		>
			<div
				className={
					router.route === "/[profile]/edit"
						? styles.userCardPreview
						: styles.userCard
				}
			>
				<div className={styles.cardTop}>
					<div className={styles.backgroundWrapper}>
						{userInfo ? (
							<Image
								src={userInfo.backgroundUrl}
								alt="User background"
								layout="responsive"
								width="400px"
								height="200px"
								objectFit="cover"
								priority
							/>
						) : null}
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
									priority
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
								Favorited: {userInfo?.favorites}
							</p>
							<p className={styles.posts}>Posts: {userInfo?.posts}</p>
						</div>
						{renderButton === true ? (
							<Link href={`/${user?.uid}/edit`}>
								<a className={styles.editButton}>Edit profile</a>
							</Link>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
};

export default UserCard;
