import React from 'react';
import styles from './date.module.css';
import { getDate } from '../../../utils/getTimeDate';

function Date() {
	const date = getDate();

	return (
		<p className={styles.date}>{date}</p>
	);
}

export default Date;
