import Link from "next/link";

import { auth } from "../../firebase/firebaseConfig";
import { useUser } from "../../context/UserContext";

import styles from "../../styles/Navbar/ProfileDropdown.module.css";

const ProfileDropdown = ({ setShowDropdown, showDropdown }) => {
	const user = useUser();

	return (
		<ul className={styles.profileDropdown}>
			<li className={styles.dropdownListItem}>
				{user ? (
					<button
						className={styles.logOutButton}
						onClick={() => {
							auth.signOut();
							setShowDropdown(!showDropdown);
						}}
					>
						Log out
					</button>
				) : (
					<Link href="/auth">
						<a onClick={() => setShowDropdown(!showDropdown)}>
							Sign In / Sign Up
						</a>
					</Link>
				)}
			</li>
			{user ? (
				<>
					<li className={styles.dropdownListItem}>Profile</li>
					<li className={styles.dropdownListItem}>Settings</li>
				</>
			) : null}
		</ul>
	);
};

export default ProfileDropdown;
