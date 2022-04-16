import { useState } from "react";
import { useRouter } from "next/router";

import NavbarLeft from "./NavbarLeft";
import NavbarCenter from "./NavbarCenter";
import NavbarRight from "./NavbarRight";

import styles from "../../styles/Navbar/Nav.module.css";

const NavbarContainer = () => {
	const router = useRouter();

	const [isSearching, setIsSearching] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	return (
		<>
			{router.pathname === "/auth" ? null : (
				<div className={styles.navContainer}>
					<nav className={styles.navBar}>
						<NavbarLeft
							isSearching={isSearching}
							setIsSearching={setIsSearching}
							setShowDropdown={setShowDropdown}
						/>
						<NavbarCenter isSearching={isSearching} />
						<NavbarRight
							isSearching={isSearching}
							showDropdown={showDropdown}
							setShowDropdown={setShowDropdown}
						/>
					</nav>
				</div>
			)}
		</>
	);
};

export default NavbarContainer;
