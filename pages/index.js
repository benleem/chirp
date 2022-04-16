import { protectedRoute } from "../hooks/routes";

import styles from "../styles/Home.module.css";

const Home = () => {
	return (
		<main className={styles.container}>
			<p>This is the home page</p>
		</main>
	);
};

export default protectedRoute(Home);
