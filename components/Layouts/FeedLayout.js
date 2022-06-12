import { useRouter } from "next/router";

import UserCard from "../UserCard";

import styles from "../../styles/Layouts/FeedLayout.module.css";

const FeedLayout = ({ children }) => {
	const router = useRouter();

	return (
		<>
			<section
				className={
					router.pathname !== "/[profile]"
						? styles.feedSection
						: styles.profileFeed
				}
			>
				{children}
			</section>
			{router.pathname !== "/[profile]" ? (
				<UserCard renderButton={true} />
			) : null}
		</>
	);
};

export default FeedLayout;
