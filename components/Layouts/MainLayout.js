import NavBarContainer from "../Navbar/NavbarContainer";

import styles from "../../styles/Layouts/MainLayout.module.css";

const MainLayout = ({ children }) => {
	return (
		<>
			<NavBarContainer />
			<main className={styles.appMain}>{children}</main>
		</>
	);
};

export default MainLayout;
