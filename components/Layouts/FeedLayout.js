import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import UserCard from "../UserCard";

import styles from "../../styles/Layouts/FeedLayout.module.css";

const FeedLayout = ({ children }) => {
	const router = useRouter();
	const [windowSize, setWindowSize] = useState();

	useEffect(() => {
		setWindowSize(window.innerWidth);

		function handleWindowResize() {
			const { innerWidth } = window;
			setWindowSize(innerWidth);
		}
		window.addEventListener("resize", handleWindowResize);
		return () => {
			window.removeEventListener("resize", handleWindowResize);
		};
	}, []);

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
			{router.pathname !== "/[profile]" && windowSize >= 600 ? (
				<UserCard renderButton={true} />
			) : null}
		</>
	);
};

export default FeedLayout;
