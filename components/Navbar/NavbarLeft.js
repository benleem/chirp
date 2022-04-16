import Link from "next/link";

import styles from "../../styles/Navbar/NavLeft.module.css";

const NavbarLeft = ({ isSearching, setIsSearching, setShowDropdown }) => {
	return (
		<div className={isSearching ? styles.navLeftActive : styles.navLeft}>
			<Link href="/">
				<a onClick={() => setShowDropdown(false)}>
					<img className={styles.navLogo} src="/img/logo.svg" alt="" />
				</a>
			</Link>
			<div className={styles.searchBarContainer}>
				<button
					className={styles.searchImageButton}
					onClick={() => {
						setIsSearching(!isSearching);
						setShowDropdown(false);
					}}
				>
					<img className={styles.searchImage} src="/img/search.svg" alt="" />
					<p className={styles.toolTip}>Search</p>
				</button>
				{isSearching ? (
					<input
						className={styles.searchBar}
						type="text"
						placeholder="Search Chirp"
					/>
				) : null}
			</div>
		</div>
	);
};

export default NavbarLeft;
