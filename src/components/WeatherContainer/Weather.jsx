import s from './weatherStyle.module.css';
import { getDate } from '../../utils/getDate.js';
import location from '../../assets/location.svg';
import { getTime } from '../../utils/getTime.js';
import { convertTimestampToTime } from '../../utils/convertTimestampToTime.js';



const Weather = (props) => {

	const pressure = props.data.main.pressure;
	const sunrise = props.data.sys.sunrise;
	const sunset = props.data.sys.sunset;
	const wind = props.data.wind.speed;
	const humidity = props.data.main.humidity;
	const clouds = props.data.weather[0].description;
	const city = props.data.name;

	const [hours, minutes] = getTime();

	const [hSunrise, mSunrise] = convertTimestampToTime(sunrise);
	const [hSunset, mSunset] = convertTimestampToTime(sunset);

	const activeButton = props.active;




	return (
		<div className={s.weather_block}>
			<p>{getDate()}</p>
			<p className={s.time}>{hours} : {minutes}</p>
			<div>
				<img src={location} alt="" className={s.location} />
				<span>{city}</span>
			</div>
			<img src={props.icon} alt="icon" className={s.weatherIcon} />
			<p>{clouds}</p>

			<div className={s.containColumn}>
				<div className={s.column}>
					<span>Temp:  {props.temp}  </span>
					<button onClick={props.clickC} className={activeButton === 'celsius' ? s.active : undefined}>C</button> <button onClick={props.clickF} className={activeButton === 'fahrenheit' ? s.active : undefined}>F</button>
					<p>Pressure: {pressure} hPa</p>
					<p>Sunrise: {hSunrise}:{mSunrise}</p>
				</div>
				<div className={s.column}>
					<p>Wind: {wind} m/s</p>
					<p>Humidity: {humidity} %</p>
					<p>Sunset: {hSunset}:{mSunset}</p>
				</div>
			</div>
			<button onClick={props.refresh} className={s.reloadButton}>Reload</button>
		</div>
	);
};

export { Weather };
