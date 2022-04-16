import { useState } from "react";
import { useRouter } from "next/router";

import NavbarLeft from "./NavbarLeft";
import NavbarCenter from "./NavbarCenter";
import NavbarRight from "./NavbarRight";
import AddPostModal from "../AddPostModal";

import styles from "../../styles/Navbar/Nav.module.css";

const NavbarContainer = () => {
	const router = useRouter();

	const [isSearching, setIsSearching] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);
	const [showPostModal, setShowPostModal] = useState(false);

	return (
		<>
			{router.pathname === "/auth" ? null : (
				<>
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
								showPostModal={showPostModal}
								setShowPostModal={setShowPostModal}
							/>
						</nav>
					</div>
					{showPostModal ? (
						<AddPostModal
							showPostModal={showPostModal}
							setShowPostModal={setShowPostModal}
						/>
					) : null}
				</>
			)}
		</>
	);
};

export default NavbarContainer;
