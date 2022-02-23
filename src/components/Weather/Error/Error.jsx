import React from 'react';
import styles from './error.module.css';

function Error({ errorMessage }) {
	return (
		<div className={styles.error}>
			<p>{errorMessage}</p>
		</div>
	);
}

export default Error;
