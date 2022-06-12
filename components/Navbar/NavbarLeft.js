import Link from "next/link";

import styles from "../../styles/Navbar/NavLeft.module.css";

const NavbarLeft = ({ setShowDropdown }) => {
	return (
		<div className={styles.navLeft}>
			<Link href="/home">
				<a onClick={() => setShowDropdown(false)}>
					<img
						className={styles.navLogo}
						src="/img/logo.svg"
						alt="logo"
						height={40}
						width={40}
					/>
				</a>
			</Link>
		</div>
	);
};

export default NavbarLeft;
