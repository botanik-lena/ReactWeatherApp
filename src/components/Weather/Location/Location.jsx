import React from 'react';
import style from './location.module.css';
import location from '../../../assets/location.svg';

function Location({ city }) {
	return (
		<div>
			<img src={location} alt="Location mark" className={style.location} />
			<span className={style['city-name']}>{city}</span>
		</div>
	);
}

export default Location;
