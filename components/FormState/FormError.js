import { useRouter } from "next/router";
import styles from "../../styles/FormState/FormError.module.css";

const FormError = ({ error, firebaseError }) => {
	const router = useRouter();

	const CheckErrorPage = () => {
		if (router.route.includes("[profile]")) {
			return (
				<p
					className={
						firebaseError ? styles.firebaseErrorHeavyPadding : styles.formError
					}
				>
					{error}
				</p>
			);
		} else {
			return (
				<p className={firebaseError ? styles.firebaseError : styles.formError}>
					{error}
				</p>
			);
		}
	};

	return <CheckErrorPage />;
};

export default FormError;
