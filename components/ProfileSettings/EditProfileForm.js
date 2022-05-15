import { useRef } from "react";
import Image from "next/image";

import styles from "../../styles/ProfileSettings/EditProfileForm.module.css";

const EditProfileForm = ({ token, userData }) => {
	const imageInputArea = useRef();

	return (
		<form className={styles.editProfileForm}>
			<div className={styles.inputContainer}>
				<div className={styles.leftColumn}>
					<div className={styles.imageContainer}>
						<Image
							src={userData.imgUrl}
							alt="User picture"
							layout="fixed"
							width="75px"
							height="75px"
							objectFit="cover"
							priority
						/>
					</div>
				</div>
				<div className={styles.rightColumn}>
					<p className={styles.name}>{userData.displayName}</p>
					<input
						ref={imageInputArea}
						className={styles.mediaUpload}
						type="file"
						name="imageUpload"
						accept="image/*"
						// onChange={(e) => handleFileChange(e)}
					/>
					<button
						className={styles.mediaUploadButton}
						type="button"
						onClick={() => imageInputArea.current.click()}
					>
						Change Profile Picture
					</button>
				</div>
			</div>
			<div className={styles.inputContainer}>
				<label className={styles.inputLabel} htmlFor="displayName">
					Display Name
				</label>
				<input
					className={styles.inputField}
					type="text"
					name="displayName"
					autoComplete="off"
					defaultValue={userData.displayName}
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
					defaultValue={userData.description}
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
					defaultValue={token.email}
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
