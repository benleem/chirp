import styles from "../styles/Header.module.css";

const Header = () => {
	return (
		<header className={styles.headerContainer}>
			<p className={styles.headerText}>This is the header</p>
		</header>
	);
};

export default Header;
