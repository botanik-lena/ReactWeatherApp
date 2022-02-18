import React from 'react';
import style from './weatherStyle.module.css';
import getDate from '../../utils/getDate';
import location from '../../assets/location.svg';
import compass from '../../assets/weatherIcons/compass.png';
import getCurrentTime from '../../utils/getCurrentTime';
import convertTimestampToTime from '../../utils/convertTimestampToTime';
import arrowImage from '../../assets/weatherIcons/arrow.png';

function Weather(
	{
		temperature,
		unitTemperature,
		data,
		onHandleRefreshPage,
		weatherIcon,
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
	const activeButton = unitTemperature;
	const rotateWindArrow = {
		transform: `rotate(${degrees}deg)`,
	};

	return (
		<div className={style['weather-container']}>
			<p className={style.date}>{getDate()}</p>
			<p className={style.time}>{hours} : {minutes}</p>
			<div>
				<img src={location} alt="locationImage" className={style.location} />
				<span className={style['city-name']}>{city}</span>
			</div>
			<img src={weatherIcon} alt={clouds} className={style['weather-icon']} />
			<p className={style['clouds-description']}>{clouds}</p>

			<div className={style['contain-column']}>
				<div className={style.column}>
					<div className={style.headers}>
						<p>Temp:</p>
						<p>Pressure: </p>
						<p>Sunrise:</p>
					</div>
					<div className={style.values}>
						<span>{temperature}°</span>
						<button type="button" onClick={onHandleCelsiusButtonClick} className={activeButton === 'celsius' ? style.active : ''}>C</button>
						<button type="button" onClick={onHandleFahrenheitButtonClick} className={activeButton === 'fahrenheit' ? style.active : ''}>F</button>
						<p>{pressure} hPa</p>
						<p>{hSunrise}:{mSunrise} am</p>
					</div>
				</div>

				<div className={style.column}>
					<div className={style.headers}>
						<img src={compass} alt="compass" className={style.compass} />
						<img src={arrowImage} alt="windDirectionArrow" style={rotateWindArrow} className={style['wind-direction-arrow']} />
						<span>Wind:</span>
						<p>Humidity:</p>
						<p>Sunset:</p>
					</div>
					<div className={style.values}>
						<p> {wind} m/s</p>
						<p>{humidity} %</p>
						<p>{hSunset}:{mSunset} pm</p>
					</div>
				</div>
			</div>

			<button type="button" onClick={onHandleRefreshPage} className={style['reload-button']}>Reload</button>
		</div>
	);
}

export default React.memo(Weather);
