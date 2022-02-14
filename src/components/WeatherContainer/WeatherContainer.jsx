import { React, useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Weather from './Weather';
import preloader from '../../assets/preloader.gif';
import s from './weatherStyle.module.css';
import kelvinToFahrenheit from '../../utils/kelvinToFahrenheit';
import kelvinToCelsius from '../../utils/kelvinToCelsius';
import getWeatherIcon from '../../utils/getWeatherIcon';

function WeatherContainer() {
	const [weatherObj, setWeatherObj] = useState(null);
	const [temp, setTemp] = useState();
	const [active, setActive] = useState('celsius');
	const [icon, setIcon] = useState();

	const getWeather = async (latitude, longitude) => {
		const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=42a887f939302b80f3235cd0c2ff81f1`);

		setWeatherObj(result.data);
		const convertTempToCelsius = kelvinToCelsius(result.data.main.temp);
		setTemp(convertTempToCelsius);
		const icon2 = await getWeatherIcon(result.data.weather[0].main);
		setIcon(icon2);
		console.log(result.data);
	};

	const getGeoLocation = () => {
		if ('geolocation' in navigator) {
			const geoSuccess = (position) => {
				getWeather(position.coords.latitude, position.coords.longitude);
			};

			const geoError = () => {
				console.log('Нет доступа к геопозиции');
			};

			const geoOptions = {
				enableHighAccuracy: true,
				maximumAge: 30000,
				timeout: 27000,
			};

			navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
		} else {
			console.log('Геопозиция недоступна');
		}
	};

	useEffect(() => {
		getGeoLocation();
	}, []);

	const refresh = () => {
		getGeoLocation();
		setTemp(weatherObj.main.temp);
		setActive('celsius');
	};

	const handleClickDebounce = debounce(refresh, 2000);

	const clickC = () => {
		const newTemp = kelvinToCelsius(weatherObj.main.temp);
		setTemp(newTemp);
		setActive('celsius');
		return newTemp;
	};

	const clickF = () => {
		const newTemp = kelvinToFahrenheit(weatherObj.main.temp);
		setTemp(newTemp);
		setActive('fahrenheit');
		return newTemp;
	};

	return (
		weatherObj
			? (
				<Weather
					refresh={handleClickDebounce}
					data={weatherObj}
					clickC={clickC}
					clickF={clickF}
					temp={temp}
					active={active}
					icon={icon}
				/>
			)
			: <div className={s.preloader}><img src={preloader} alt="preloader" /></div>

	);
}

export default WeatherContainer;
