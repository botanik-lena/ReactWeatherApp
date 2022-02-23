import React from 'react';
import styles from './time.module.css';
import { getCurrentTime } from '../../../utils/getTimeDate';

function Time() {
	const [hours, minutes] = getCurrentTime();
	return (
		<p className={styles.time}>{hours} : {minutes}</p>
	);
}

export default Time;
