import { useRouter } from "next/router";

import NavBarContainer from "./Navbar/NavbarContainer";
import UserCard from "./UserCard";

import styles from "../styles/MainLayout.module.css";

const MainLayout = ({ children }) => {
	const router = useRouter();

	return (
		<>
			{router.pathname === "/" ? (
				<main className={styles.authMain}>{children}</main>
			) : (
				<>
					<NavBarContainer />
					<main className={styles.appMain}>
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
							<UserCard />
						) : null}
					</main>
				</>
			)}
		</>
	);
};

export default MainLayout;
