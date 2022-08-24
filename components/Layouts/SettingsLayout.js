import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import { useAuth } from "../../hooks/client/useAuth";

import styles from "../../styles/Layouts/SettingsLayout.module.css";

const SettingsLayout = ({ children }) => {
	const user = useAuth();
	const router = useRouter();

	const [selectedPage, setSelectedPage] = useState(
		router.route.replace("/[profile]/", "")
	);
	const [windowSize, setWindowSize] = useState();
	const [showContent, setShowContent] = useState(true);

	// const HandleModbileView = () => {
	// 	if (innerWidth >= 600) {
	// 		return <section className={styles.settingsContent}>{children}</section>;
	// 	} else {
	// 		return <></>;
	// 	}
	// };

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

	useEffect(() => {
		setSelectedPage(router.route.replace("/[profile]/", ""));
		setShowContent(true);
	}, [router]);

	return (
		<>
			{/* <HandleModbileView></HandleModbileView> */}
			{windowSize >= 600 || showContent === false ? (
				<section className={styles.tabSection}>
					<div className={styles.linkTab}>
						<Link href={`/${user?.uid}/edit`}>
							<a
								className={
									selectedPage === "edit"
										? styles.linkBorderLeft
										: styles.settingsLink
								}
							>
								Edit Profile
							</a>
						</Link>
						<Link href={`/${user?.uid}/password`}>
							<a
								className={
									selectedPage === "password"
										? styles.linkBorderLeft
										: styles.settingsLink
								}
							>
								Change Password
							</a>
						</Link>
						<Link href={`/${user?.uid}/email`}>
							<a
								className={
									selectedPage === "email"
										? styles.linkBorderLeft
										: styles.settingsLink
								}
							>
								Change Email
							</a>
						</Link>
					</div>
				</section>
			) : null}
			{windowSize >= 600 || showContent === true ? (
				<section className={styles.settingsContent}>
					<button
						className={styles.backButton}
						onClick={() => setShowContent(false)}
					>
						&#60;
					</button>
					{children}
				</section>
			) : null}
		</>
	);
};

export default SettingsLayout;
