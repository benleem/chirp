import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";

import ProfileDropdown from "./ProfileDropdown";
import NavButton from "./NavButton";

import styles from "../../styles/Navbar/NavRight.module.css";

const NavbarRight = ({
	showDropdown,
	setShowDropdown,
	showPostModal,
	setShowPostModal,
}) => {
	return (
		<ul className={styles.navListContainer}>
			<li className={styles.navListItem}>
				<NavButton
					imgUrl="/img/add.svg"
					alt="Add post"
					toolTip="Add post"
					openPostModal={true}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
					setShowPostModal={setShowPostModal}
				/>
			</li>

			<li className={styles.navListItem}>
				<NavButton
					imgUrl="/img/profile.svg"
					alt="Profile"
					toolTip="Profile"
					openPostModal={false}
					showDropdown={showDropdown}
					setShowDropdown={setShowDropdown}
					setShowPostModal={setShowPostModal}
				/>
				{showDropdown ? (
					<ProfileDropdown
						showDropdown={showDropdown}
						setShowDropdown={setShowDropdown}
					/>
				) : null}
			</li>
		</ul>
	);
};

export default NavbarRight;
