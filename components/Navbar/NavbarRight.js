import Link from "next/link";

import ProfileDropdown from "./ProfileDropdown";

import styles from "../../styles/Navbar/NavRight.module.css";

const NavbarRight = ({
	isSearching,
	showDropdown,
	setShowDropdown,
	showPostModal,
	setShowPostModal,
}) => {
	return (
		<>
			{isSearching ? null : (
				<ul className={styles.navListContainer}>
					<li className={styles.navListItem}>
						<button
							className={styles.navListButton}
							onClick={() => {
								setShowDropdown(false);
								setShowPostModal(!showPostModal);
							}}
						>
							<img src="/img/add.svg" alt="Add post" height={40} width={40} />
							<p className={styles.toolTip}>Add post</p>
						</button>
					</li>
					<li className={styles.navListItem}>
						<Link href="/favorited">
							<a
								className={styles.navListAnchor}
								onClick={() => setShowDropdown(false)}
							>
								<img
									src="/img/favorite.svg"
									alt="Favorited"
									height={40}
									width={40}
								/>
								<p className={styles.toolTip}>Favorited</p>
							</a>
						</Link>
					</li>
					<li className={styles.navListItem}>
						<button
							className={styles.navListButton}
							onClick={() => setShowDropdown(!showDropdown)}
						>
							<img
								src="/img/profile.svg"
								alt="Profile"
								height={40}
								width={40}
							/>
							<p className={styles.toolTip}>Profile</p>
						</button>
						{showDropdown ? (
							<ProfileDropdown
								showDropdown={showDropdown}
								setShowDropdown={setShowDropdown}
							/>
						) : null}
					</li>
				</ul>
			)}
		</>
	);
};

export default NavbarRight;
