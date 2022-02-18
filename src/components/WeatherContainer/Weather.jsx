import React from 'react';
import s from './weatherStyle.module.css';
import getDate from '../../utils/getDate';
import location from '../../assets/location.svg';
import compass from '../../assets/weatherIcons/compass.png';
import getCurrentTime from '../../utils/getCurrentTime';
import convertTimestampToTime from '../../utils/convertTimestampToTime';
import arrowImage from '../../assets/weatherIcons/arrow.png';

function Weather(
	{
		temperature,
		selectedTemperatureMeasurementUnit,
		data,
		refreshPage,
		icon,
		onHandleCelsiusButtonClick,
		onHandleFahrenheitButtonClick,
	},
) {
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
		<div className={s['weather-container']}>
			<p className={s.date}>{getDate()}</p>
			<p className={s.time}>{hours} : {minutes}</p>
			<div>
				<img src={location} alt="locationImage" className={s.location} />
				<span className={s['city-name']}>{city}</span>
			</div>
			<img src={icon} alt={clouds} className={s['weather-icon']} />
			<p className={s['clouds-description']}>{clouds}</p>

			<div className={s['contain-column']}>
				<div className={s.column}>
					<div className={s.headers}>
						<p>Temp:</p>
						<p>Pressure: </p>
						<p>Sunrise:</p>
					</div>
					<div className={s.values}>
						<span>{temperature}°</span>
						<button type="button" onClick={onHandleCelsiusButtonClick} className={activeButton === 'celsius' ? s.active : ''}>C</button>
						<button type="button" onClick={onHandleFahrenheitButtonClick} className={activeButton === 'fahrenheit' ? s.active : ''}>F</button>
						<p>{pressure} hPa</p>
						<p>{hSunrise}:{mSunrise} am</p>
					</div>
				</div>

				<div className={s.column}>
					<div className={s.headers}>
						<img src={compass} alt="compass" className={s.compass} />
						<img src={arrowImage} alt="windDirectionArrow" style={{ transform: `rotate(${degrees}deg)` }} className={s['wind-direction-arrow']} />
						<span>Wind:</span>
						<p>Humidity:</p>
						<p>Sunset:</p>
					</div>
					<div className={s.values}>
						<p> {wind} m/s</p>
						<p>{humidity} %</p>
						<p>{hSunset}:{mSunset} pm</p>
					</div>
				</div>
			</div>

			<button type="button" onClick={refreshPage} className={s['reload-button']}>Reload</button>
		</div>
	);
}

export default React.memo(Weather);
