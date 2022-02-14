import React from 'react';
import s from './weatherStyle.module.css';
import getDate from '../../utils/getDate';
import location from '../../assets/location.svg';
import getTime from '../../utils/getTime';
import convertTimestampToTime from '../../utils/convertTimestampToTime';

function Weather(props) {
	const {
		temp,
		selectedTemperatureMeasurementUnit,
		data,
		refreshPage,
		icon,
		onHandleCelsiusButtonClick,
		onHandleFahrenheitButtonClick,
	} = props;
	const { pressure } = data.main;
	const { sunrise, sunset } = data.sys;
	const wind = data.wind.speed;
	const { humidity } = data.main;
	const clouds = data.weather[0].description;
	const city = data.name;
	const [hours, minutes] = getTime();
	const [hSunrise, mSunrise] = convertTimestampToTime(sunrise);
	const [hSunset, mSunset] = convertTimestampToTime(sunset);
	const activeButton = selectedTemperatureMeasurementUnit;
	return (
		<div className={s.weatherContainer}>
			<p>{getDate()}</p>
			<p className={s.time}>{hours} : {minutes}</p>
			<div>
				<img src={location} alt="locationImage" className={s.location} />
				<span>{city}</span>
			</div>
			<img src={icon} alt={clouds} className={s.weatherIcon} />
			<p>{clouds}</p>

			<div className={s.containColumn}>
				<div className={s.column}>
					<span>Temp: {temp}</span>
					<button type="button" onClick={onHandleCelsiusButtonClick} className={activeButton === 'celsius' ? s.active : ''}>C</button>
					<button type="button" onClick={onHandleFahrenheitButtonClick} className={activeButton === 'fahrenheit' ? s.active : ''}>F</button>
					<p>Pressure: {pressure} hPa</p>
					<p>Sunrise: {hSunrise}:{mSunrise}</p>
				</div>
				<div className={s.column}>
					<p>Wind: {wind} m/s</p>
					<p>Humidity: {humidity} %</p>
					<p>Sunset: {hSunset}:{mSunset}</p>
				</div>
			</div>
			<button type="button" onClick={refreshPage} className={s.reloadButton}>Reload</button>
		</div>
	);
}

export default React.memo(Weather);
