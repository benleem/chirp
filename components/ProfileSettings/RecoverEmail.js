import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { applyActionCode, signOut } from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";

import FormLoading from "../FormState/FormLoading";

import styles from "../../styles/ProfileSettings/RecoverEmail.module.css";

const RecoverEmail = ({ query }) => {
	const router = useRouter();

	const [formLoading, setFormLoading] = useState(false);
	const [firebaseError, setFirebaseError] = useState("");

	const recoverEmail = async () => {
		try {
			setFormLoading(true);
			await auth.currentUser.reload();
			await applyActionCode(auth, query.oobCode);
			await signOut(auth);
			setFirebaseError(false);
			await router.push("/");
		} catch (error) {
			setFirebaseError(false);
			const errorMessage = error.message;
			setFirebaseError(errorMessage);
		}
	};

	useEffect(() => {
		console.log(firebaseError);
	}, [firebaseError]);

	return (
		<div className={styles.recoverEmailContainer}>
			<div className={styles.recoverEmail}>
				{formLoading ? <FormLoading /> : null}
				<div className={styles.topContainer}>
					<img className={styles.lock} src="/img/mail.svg" alt="lock" />
					<p className={styles.query}>Your email has changed</p>
					<p className={styles.prompt}>
						If you did not change your email, click the button below. This will
						revert your email back to your last email used. You will also be
						signed out so you can sign in with your appopriate email.
					</p>
				</div>
				<button className={styles.submitButton} onClick={recoverEmail}>
					Recover Email
				</button>
				{firebaseError ? (
					<FormError error={firebaseError} firebaseError={true} />
				) : null}
			</div>
		</div>
	);
};

export default RecoverEmail;
