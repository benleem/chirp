import Link from "next/link";
import { useRouter } from "next/router";

import { auth } from "../../firebase/firebaseConfig";
import { useAuth } from "../../hooks/client/useAuth";

import styles from "../../styles/Navbar/ProfileDropdown.module.css";

const ProfileDropdown = ({ setShowDropdown, showDropdown }) => {
	const router = useRouter();
	const user = useAuth();

	return (
		<ul className={styles.profileDropdown}>
			{user ? (
				<>
					<li className={styles.dropdownListItem}>{user?.email}</li>
					<li className={styles.dropdownListItem}>
						<Link href={`/${user.uid}`}>
							<a
								onClick={() => {
									setShowDropdown(!showDropdown);
								}}
							>
								Profile
							</a>
						</Link>
					</li>
					<li className={styles.dropdownListItem}>
						<Link href={`/${user.uid}/edit`}>
							<a
								onClick={() => {
									setShowDropdown(!showDropdown);
								}}
							>
								Settings
							</a>
						</Link>
					</li>
					<li className={styles.dropdownListItem}>
						<button
							className={styles.logOutButton}
							onClick={() => {
								auth.signOut();
								setShowDropdown(!showDropdown);
								router.push("/");
							}}
						>
							Log out
						</button>
					</li>
				</>
			) : (
				<li className={styles.dropdownListItem}>
					<Link href="/">
						<a onClick={() => setShowDropdown(!showDropdown)}>
							Sign In / Sign Up
						</a>
					</Link>
				</li>
			)}
		</ul>
	);
};

export default ProfileDropdown;
