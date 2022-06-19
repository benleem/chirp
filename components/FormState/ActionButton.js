import styles from "../../styles/FormState/ActionButton.module.css";

const ActionButton = ({ text, action, addMargin }) => {
	return (
		<button
			type="button"
			className={addMargin === true ? styles.buttonMargin : styles.button}
			onClick={action}
		>
			{text}
		</button>
	);
};

export default ActionButton;
