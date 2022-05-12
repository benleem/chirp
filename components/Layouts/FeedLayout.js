import { useRouter } from "next/router";

import UserCard from "../UserCard";

import styles from "../../styles/Layouts/FeedLayout.module.css";

const FeedLayout = ({ children }) => {
	const router = useRouter();

	return (
		<>
			<section
				className={
					router.pathname === "/home" || router.pathname === "/favorited"
						? styles.feedSection
						: styles.profileFeed
				}
			>
				{children}
			</section>
			{router.pathname === "/home" || router.pathname === "/favorited" ? (
				<UserCard renderButton={true} />
			) : null}
		</>
	);
};

export default FeedLayout;
