import React from 'react';
import s from './weatherStyle.module.css';
import { getDate } from '../../utils/getDate';
import location from '../../assets/location.svg';
import { getTime } from '../../utils/getTime';
import { convertTimestampToTime } from '../../utils/convertTimestampToTime';

function Weather({ data }, refresh, clickF, clickC, temp, active, icon) {
	const { pressure } = data.main;
	const { sunrise, sunset } = data.sys;
	const { wind } = data.wind.speed;
	const { humidity } = data.main;
	const { clouds } = data.weather[0].description;
	const { city } = data.name;

	const [hours, minutes] = getTime();

	const [hSunrise, mSunrise] = convertTimestampToTime(sunrise);
	const [hSunset, mSunset] = convertTimestampToTime(sunset);

	const activeButton = active;

	return (
		<div className={s.weather_block}>
			<p>{getDate()}</p>
			<p className={s.time}>{hours} : {minutes}</p>
			<div>
				<img src={location} alt="location" className={s.location} />
				<span>{city}</span>
			</div>
			<img src={icon} alt="icon" className={s.weatherIcon} />
			<p>{clouds}</p>

			<div className={s.containColumn}>
				<div className={s.column}>
					<span>Temp:  {temp}</span>
					<button type="button" onClick={clickC} className={activeButton === 'celsius' ? s.active : ''}>C</button>
					<button type="button" onClick={clickF} className={activeButton === 'fahrenheit' ? s.active : ''}>F</button>
					<p>Pressure: {pressure} hPa</p>
					<p>Sunrise: {hSunrise}:{mSunrise}</p>
				</div>
				<div className={s.column}>
					<p>Wind: {wind} m/s</p>
					<p>Humidity: {humidity} %</p>
					<p>Sunset: {hSunset}:{mSunset}</p>
				</div>
			</div>
			<button onClick={refresh} className={s.reloadButton}>Reload</button>
		</div>
	);
}

export default Weather;
