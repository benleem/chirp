import React from "react";

import styles from "../../styles/Navbar/NavCenter.module.css";

const NavbarCenter = ({ isSearching }) => {
	return (
		<>
			{isSearching ? null : (
				<h2 className={styles.dailyMessage}>Chirp - It's what's happening</h2>
			)}
		</>
	);
};

export default NavbarCenter;
