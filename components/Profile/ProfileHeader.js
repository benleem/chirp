import styles from "../../styles/ProfileHeader.module.css";

const ProfileHeader = ({ userData, setView }) => {
	return (
		<div className={styles.profileHeader}>
			<p>Profile: {userData.displayName}</p>
			<button onClick={() => setView("posts")}>Show Posts</button>
			<button onClick={() => setView("favorites")}>Show Favorites</button>
			<button onClick={() => setView("comments")}>Show Comments</button>
		</div>
	);
};

export default ProfileHeader;
