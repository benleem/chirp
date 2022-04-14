import { useState } from "react";

import Link from "next/link";
import { useRouter } from "next/router";
import styles from "../styles/Header.module.css";

const Header = () => {
	const router = useRouter();
	const [isSearching, setIsSearching] = useState(false);
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
								<li>
									<button className={styles.navListButton}>
										<img src="/img/add.svg" alt="" />
										<p className={styles.toolTip}>Add post</p>
									</button>
								</li>
								<li>
									<Link href="/favorites">
										<a className={styles.navListAnchor}>
											<img src="/img/favorite.svg" alt="" />
											<p className={styles.toolTip}>Favorites</p>
										</a>
									</Link>
								</li>
								<li>
									<Link href="/messages">
										<a className={styles.navListAnchor}>
											<img src="/img/message.svg" alt="" />
											<p className={styles.toolTip}>Messages</p>
										</a>
									</Link>
								</li>
								<li>
									<button className={styles.navListButton}>
										<img src="/img/profile.svg" alt="" />
										<p className={styles.toolTip}>Profile</p>
									</button>
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
