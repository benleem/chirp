import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { auth } from "../firebase/firebaseConfig";
import { useUser } from "../context/UserContext";

import styles from "../styles/Header.module.css";

const Header = () => {
	const user = useUser();
	const router = useRouter();

	const [isSearching, setIsSearching] = useState(false);
	const [showDropdown, setShowDropdown] = useState(false);

	return (
		<>
			{router.pathname === "/auth" ? null : (
				<header className={styles.headerContainer}>
					<div className={styles.headerWrapper}>
						<div
							className={
								isSearching ? styles.headerLeftActive : styles.headerLeft
							}
						>
							<Link href="/">
								<a>
									<img
										className={styles.headerLogo}
										src="/img/logo.svg"
										alt=""
									/>
								</a>
							</Link>
							<div className={styles.searchBarContainer}>
								<button
									className={styles.searchImageButton}
									onClick={() => setIsSearching(!isSearching)}
								>
									<img
										className={styles.searchImage}
										src="/img/search.svg"
										alt=""
									/>
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
						{isSearching ? null : (
							<h2 className={styles.dailyMessage}>
								Chirp - It's what's happening
							</h2>
						)}
						{isSearching ? null : (
							<ul className={styles.navListContainer}>
								<li className={styles.navListItem}>
									<button className={styles.navListButton}>
										<img src="/img/add.svg" alt="" />
										<p className={styles.toolTip}>Add post</p>
									</button>
								</li>
								<li className={styles.navListItem}>
									<Link href="/favorites">
										<a className={styles.navListAnchor}>
											<img src="/img/favorite.svg" alt="" />
											<p className={styles.toolTip}>Favorites</p>
										</a>
									</Link>
								</li>
								<li className={styles.navListItem}>
									<Link href="/messages">
										<a className={styles.navListAnchor}>
											<img src="/img/message.svg" alt="" />
											<p className={styles.toolTip}>Messages</p>
										</a>
									</Link>
								</li>
								<li className={styles.navListItem}>
									<button
										className={styles.navListButton}
										onClick={() => setShowDropdown(!showDropdown)}
									>
										<img src="/img/profile.svg" alt="" />
										<p className={styles.toolTip}>Profile</p>
									</button>
									{showDropdown ? (
										<ul className={styles.profileDropdown}>
											<li className={styles.dropdownListItem}>
												{user ? (
													<button
														className={styles.logOutButton}
														onClick={() => auth.signOut()}
													>
														Log out
													</button>
												) : (
													<Link href="/auth">
														<a>Sign In / Sign Up</a>
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
									) : null}
								</li>
							</ul>
						)}
					</div>
				</header>
			)}
		</>
	);
};

export default Header;
