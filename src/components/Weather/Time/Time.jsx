import React from 'react';
import style from './time.module.css';
import getCurrentTime from '../../../utils/getCurrentTime';

function Time() {
	const [hours, minutes] = getCurrentTime();
	return (
		<p className={style.time}>{hours} : {minutes}</p>
	);
}

export default Time;
