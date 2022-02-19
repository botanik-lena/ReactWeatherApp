import React from 'react';
import style from './error.module.css';

function Error(errorMessage) {
	return (
		<div className={style.error}>
			<p>{errorMessage}</p>
		</div>
	);
}

export default Error;
