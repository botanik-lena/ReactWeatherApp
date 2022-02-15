import React from 'react';
import s from './weatherStyle.module.css';
import getDate from '../../utils/getDate';
import location from '../../assets/location.svg';
import getCurrentTime from '../../utils/getCurrentTime';
import convertTimestampToTime from '../../utils/convertTimestampToTime';
import arrowImage from '../../assets/weatherIcons/arrow.png';

function Weather(props) {
	const {
		temperature,
		selectedTemperatureMeasurementUnit,
		data,
		refreshPage,
		icon,
		onHandleCelsiusButtonClick,
		onHandleFahrenheitButtonClick,
	} = props;
	const { pressure } = data.main;
	const { sunrise, sunset } = data.sys;
	const { humidity } = data.main;
	const wind = data.wind.speed;
	const degrees = data.wind.deg;
	const clouds = data.weather[0].description;
	const city = data.name;
	const [hours, minutes] = getCurrentTime();
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
					<span>Temp: {temperature}</span>
					<button type="button" onClick={onHandleCelsiusButtonClick} className={activeButton === 'celsius' ? s.active : ''}>C</button>
					<button type="button" onClick={onHandleFahrenheitButtonClick} className={activeButton === 'fahrenheit' ? s.active : ''}>F</button>
					<p>Pressure: {pressure} hPa</p>
					<p>Sunrise: {hSunrise}:{mSunrise}</p>
				</div>
				<div className={s.column}>
					<img src={arrowImage} alt="windDirectionArrow" style={{ transform: `rotate(${degrees}deg)` }} className={s.windDirectionArrow} />
					<span>Wind: {wind} m/s</span>
					<p>Humidity: {humidity} %</p>
					<p>Sunset: {hSunset}:{mSunset}</p>
				</div>
			</div>
			<button type="button" onClick={refreshPage} className={s.reloadButton}>Reload</button>
		</div>
	);
}

export default React.memo(Weather);
