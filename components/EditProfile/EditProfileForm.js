import styles from "../../styles/EditProfile/EditProfileForm.module.css";

const EditProfileForm = () => {
	return (
		<form className={styles.editProfileForm}>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="displayName">
					Display Name
				</label>
				<input
					className={styles.inputField}
					type="text"
					name="displayName"
					autoComplete="off"
					// placeholder="example@email.com"
					// onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="description">
					Description
				</label>
				<input
					className={styles.inputField}
					type="text"
					name="description"
					autoComplete="off"
					// placeholder="example@email.com"
					// onChange={(e) => handleChange(e)}
				/>
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="email">
					Email
				</label>
				<input
					className={styles.inputField}
					type="email"
					name="email"
					autoComplete="off"
					// placeholder="example@email.com"
					// onChange={(e) => handleChange(e)}
				/>
			</div>
			<button className={styles.submitButton} type="submit">
				Submit
			</button>
		</form>
	);
};

export default EditProfileForm;
