import React from 'react';
import styles from './button.module.css';

function Button({ onClick, className, buttonText }) {
	return (
		<button type="button" onClick={onClick} className={styles[className]}>{buttonText}</button>
	);
}
export default React.memo(Button);
