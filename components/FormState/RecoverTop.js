import styles from "../../styles/FormState/RecoverTop.module.css";

const RecoverTop = ({ img, query, prompt }) => {
	return (
		<div className={styles.topContainer}>
			<img className={styles.img} src={img} alt="lock" />
			<p className={styles.query}>{query}</p>
			<p className={styles.prompt}>{prompt}</p>
		</div>
	);
};

export default RecoverTop;
