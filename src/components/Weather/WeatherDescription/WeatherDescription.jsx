import React from 'react';
import styles from './weatherDescription.module.css';
import { convertTimestampToTime } from '../../../utils/getTimeDate';
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
			<div className={styles['contain-column']}>
				<div className={styles.column}>
					<div className={styles.headers}>
						<p>Temp:</p>
						<p>Pressure: </p>
						<p>Sunrise:</p>
					</div>
					<div className={styles.values}>
						<span>{temperature}°</span>
						<button type="button" onClick={onHandleCelsiusButtonClick} className={unitTemperature === UNIT.CELSIUS ? styles.active : ''}>C</button>
						<button type="button" onClick={onHandleFahrenheitButtonClick} className={unitTemperature === UNIT.FAHRENHEIT ? styles.active : ''}>F</button>
						<p>{pressure} hPa</p>
						<p>{hSunrise}:{mSunrise} am</p>
					</div>
				</div>

				<div className={styles.column}>
					<div className={styles.headers}>
						<img src={compass} alt="compass" className={styles.compass} />
						<img src={arrowImage} alt="windDirectionArrow" style={rotateWindArrow} className={styles['wind-direction-arrow']} />
						<span>Wind:</span>
						<p>Humidity:</p>
						<p>Sunset:</p>
					</div>
					<div className={styles.values}>
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
