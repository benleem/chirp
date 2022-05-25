import { motion } from "framer-motion";

import styles from "../../styles/FormState/FormLoading.module.css";

const FormLoading = () => {
	return (
		<div className={styles.formLoading}>
			<motion.img
				className={styles.formLoadingPulse}
				animate={{ scale: [1, 1.3, 1] }}
				transition={{ loop: Infinity, ease: "linear", duration: 0.3 }}
				src="/img/logo-green.svg"
				alt="loading"
			/>
		</div>
	);
};

export default FormLoading;
