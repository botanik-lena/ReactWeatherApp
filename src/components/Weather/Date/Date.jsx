import React from 'react';
import style from './date.module.css';
import { getDate } from '../../../utils/getTimeDate';

function Date() {
	const date = getDate();

	return (
		<p className={style.date}>{date}</p>
	);
}

export default Date;
