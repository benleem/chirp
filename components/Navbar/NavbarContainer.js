import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { AnimatePresence } from "framer-motion";

import { EditContext } from "../../context/EditContext";

import NavbarLeft from "./NavbarLeft";
import NavbarCenter from "./NavbarCenter";
import NavbarRight from "./NavbarRight";
import AddPostModal from "../AddPostModal";

import styles from "../../styles/Navbar/Nav.module.css";

const NavbarContainer = () => {
	const { editActive } = useContext(EditContext);

	const router = useRouter();

	const [showDropdown, setShowDropdown] = useState(false);
	const [showPostModal, setShowPostModal] = useState(false);

	useEffect(() => {
		if (editActive === true) {
			setShowPostModal(true);
		}
	}, [editActive]);

	return (
		<>
			{router.pathname === "/" ? null : (
				<>
					<div className={styles.navContainer}>
						<nav className={styles.navBar}>
							<NavbarLeft setShowDropdown={setShowDropdown} />
							<NavbarCenter />
							<NavbarRight
								showDropdown={showDropdown}
								setShowDropdown={setShowDropdown}
								showPostModal={showPostModal}
								setShowPostModal={setShowPostModal}
							/>
						</nav>
					</div>
					{showPostModal ? (
						<AddPostModal setShowPostModal={setShowPostModal} />
					) : null}
				</>
			)}
		</>
	);
};

export default NavbarContainer;
