import React from 'react';
import style from './weatherIcon.module.css';

function WeatherIcon({ description, weatherIconPath }) {
	return (
		<div>
			<img src={weatherIconPath} alt={description} className={style['weather-icon']} />
			<p className={style['clouds-description']}>{description}</p>
		</div>
	);
}

export default WeatherIcon;
