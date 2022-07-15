import { motion } from "framer-motion";
import styles from "../../styles/Feed/InteractionError.module.css";

const InteractionError = () => {
	return (
		<motion.div
			className={styles.errorWrapper}
			initial={{ opacity: 1 }}
			animate={{ opacity: 1 }}
			exit={{ opacity: 0 }}
			transition={{
				duration: 0.2,
			}}
		>
			<p className={styles.error}>
				Something went wrong, please try again or refresh the page
			</p>
		</motion.div>
	);
};

export default InteractionError;
