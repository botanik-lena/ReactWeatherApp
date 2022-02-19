import React from 'react';
import style from './weatherDescription.module.css';
import convertTimestampToTime from '../../../utils/convertTimestampToTime';
import compass from '../../../assets/weatherIcons/compass.png';
import arrowImage from '../../../assets/weatherIcons/arrow.png';
import UNIT from '../../../constants';

function WeatherDescription({
	temperature,
	unitTemperature,
	onHandleCelsiusButtonClick,
	onHandleFahrenheitButtonClick,
	windSpeed,
	degrees,
	humidity,
	sunrise,
	sunset,
	pressure,
}) {
	const [hSunrise, mSunrise] = convertTimestampToTime(sunrise);
	const [hSunset, mSunset] = convertTimestampToTime(sunset);
	const rotateWindArrow = {
		transform: `rotate(${degrees}deg)`,
	};
	return (
		<div>
			<div className={style['contain-column']}>
				<div className={style.column}>
					<div className={style.headers}>
						<p>Temp:</p>
						<p>Pressure: </p>
						<p>Sunrise:</p>
					</div>
					<div className={style.values}>
						<span>{temperature}°</span>
						<button type="button" onClick={onHandleCelsiusButtonClick} className={unitTemperature === UNIT.CELSIUS ? style.active : ''}>C</button>
						<button type="button" onClick={onHandleFahrenheitButtonClick} className={unitTemperature === UNIT.FAHRENHEIT ? style.active : ''}>F</button>
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
						<p> {windSpeed} m/s</p>
						<p>{humidity} %</p>
						<p>{hSunset}:{mSunset} pm</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default React.memo(WeatherDescription);
