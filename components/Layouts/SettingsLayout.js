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

	useEffect(() => {
		setSelectedPage(router.route.replace("/[profile]/", ""));
	}, [router]);

	useEffect(() => {
		console.log(selectedPage);
	}, [selectedPage]);

	return (
		<>
			<section className={styles.tabSection}>
				<div className={styles.linkTab}>
					<Link href={`/${user?.uid}/settings`}>
						<a
							className={
								selectedPage === "settings"
									? styles.linkBorderLeft
									: styles.settingsLink
							}
						>
							Settings
						</a>
					</Link>
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
				</div>
			</section>
			<section className={styles.settingsContent}>{children}</section>
		</>
	);
};

export default SettingsLayout;
