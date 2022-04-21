import { useEffect } from "react";
import Link from "next/link";

import { auth } from "../../firebase/firebaseConfig";
import { useUser } from "../../context/UserContext";

import styles from "../../styles/Navbar/ProfileDropdown.module.css";

const ProfileDropdown = ({ setShowDropdown, showDropdown }) => {
	const user = useUser();

	useEffect(() => {
		if (user) {
			console.log(user);
		}
	}, []);

	return (
		<ul className={styles.profileDropdown}>
			{user ? (
				<>
					<li className={styles.dropdownListItem}>{user?.email}</li>
					<li className={styles.dropdownListItem}>Profile</li>
					<li className={styles.dropdownListItem}>Settings</li>
				</>
			) : null}
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
		</ul>
	);
};

export default ProfileDropdown;
