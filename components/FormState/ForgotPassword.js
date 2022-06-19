import Link from "next/link";

import styles from "../../styles/FormState/ForgotPassword.module.css";

const ForgotPassword = () => {
	return (
		<div className={styles.forgotPasswordContainer}>
			<Link href="/recover">
				<a className={styles.forgotPassword}>Forgot password?</a>
			</Link>
		</div>
	);
};

export default ForgotPassword;
