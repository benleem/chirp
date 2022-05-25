import styles from "../../styles/FormState/FormError.module.css";

const FormError = ({ error, firebaseError }) => {
	return (
		<p className={firebaseError ? styles.firebaseError : styles.formError}>
			{error}
		</p>
	);
};

export default FormError;
