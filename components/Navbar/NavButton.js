import styles from "../../styles/Navbar/NavButton.module.css";

const NavButton = ({
	imgUrl,
	alt,
	toolTip,
	openPostModal,
	showDropdown,
	setShowDropdown,
	setShowPostModal,
}) => {
	return (
		<button
			className={styles.navListButton}
			onClick={() => {
				{
					openPostModal === true ? setShowPostModal(true) : null;
				}
				{
					openPostModal === true
						? setShowDropdown(false)
						: setShowDropdown(!showDropdown);
				}
			}}
		>
			<img src={imgUrl} alt={alt} height={40} width={40} />
			<p className={styles.toolTip}>{toolTip}</p>
		</button>
	);
};

export default NavButton;
