import styles from "../../styles/FormState/SubmitButton.module.css";

const SubmitButton = ({ text }) => {
	return (
		<button type="submit" className={styles.submitButton}>
			{text}
		</button>
	);
};

export default SubmitButton;
