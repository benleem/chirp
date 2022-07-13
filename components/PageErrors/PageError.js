import Link from "next/link";

import styles from "../../styles/PageErrors/PageError.module.css";

const PageError = ({ title, text }) => {
	return (
		<div className={styles.badUrl}>
			<p className={styles.errorTitle}>{title}</p>
			<p className={styles.errorText}>{text}</p>
			<Link href="/home">
				<a className={styles.errorButton}>Go home</a>
			</Link>
		</div>
	);
};

export default PageError;
