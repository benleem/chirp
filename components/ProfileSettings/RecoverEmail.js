import { useState } from "react";
import { useRouter } from "next/router";
import { applyActionCode, signOut } from "firebase/auth";

import { auth } from "../../firebase/firebaseConfig";

import FormLoading from "../FormState/FormLoading";
import RecoverTop from "../FormState/RecoverTop";
import ActionButton from "../FormState/ActionButton";
import FormError from "../FormState/FormError";

// import styles from "../../styles/ProfileSettings/RecoverEmail.module.css";
import styles from "../../styles/ProfileSettings/RecoverForm.module.css";

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

	return (
		<section className={styles.recoverFormContainer}>
			<div className={styles.recoverForm}>
				{formLoading ? <FormLoading /> : null}
				<RecoverTop
					img="/img/mail.svg"
					query="Your email has changed"
					prompt="If you did not change your email, click the button below. This will
					revert your email back to your last email used. You will also be
					signed out so you can sign in with your appopriate email."
				/>
				<ActionButton
					text="Recover Email"
					action={recoverEmail}
					addMargin={true}
				/>
				{firebaseError ? (
					<FormError error={firebaseError} firebaseError={true} />
				) : null}
			</div>
		</section>
	);
};

export default RecoverEmail;
