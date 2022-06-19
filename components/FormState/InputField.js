import FormError from "./FormError";

import styles from "../../styles/FormState/InputField.module.css";

const InputField = ({
	label,
	reference,
	type,
	id,
	placeholder,
	autoComplete,
	defaultValue,
	formError,
	addMargin,
	handleChange,
}) => {
	return (
		<div
			className={
				addMargin === true ? styles.inputContainerMargin : styles.inputContainer
			}
		>
			{label ? (
				<label className={styles.inputLabel} htmlFor={id}>
					{label}
				</label>
			) : null}
			<input
				ref={reference ? reference : null}
				id={id}
				className={styles.inputField}
				type={type}
				placeholder={placeholder ? placeholder : null}
				autoComplete={autoComplete ? autoComplete : null}
				defaultValue={defaultValue ? defaultValue : null}
				onChange={(e) => handleChange(e)}
			/>
			{formError ? <FormError error={formError} firebaseError={false} /> : null}
		</div>
	);
};

export default InputField;
