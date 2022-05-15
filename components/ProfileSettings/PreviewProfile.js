import UserCard from "../UserCard";

import styles from "../../styles/ProfileSettings/PreviewProfile.module.css";

const PreviewProfile = ({ userData }) => {
	return (
		<div className={styles.previewProfile}>
			<p className={styles.previewHeader}>Profile preview</p>
			<UserCard profileData={userData} renderButton={false} />
		</div>
	);
};

export default PreviewProfile;
