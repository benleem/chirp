import { Router, useRouter } from "next/router";
import styles from "../styles/Header.module.css";

const Header = () => {
	const router = useRouter();
	return (
		<>
			{router.pathname === "/auth" ? null : (
				<header className={styles.headerContainer}>
					<p className={styles.headerText}>This is the header</p>
				</header>
			)}
		</>
	);
};

export default Header;
