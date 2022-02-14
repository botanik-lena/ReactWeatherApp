import { useState, useEffect } from 'react';
import { Weather } from './Weather';
import axios from 'axios';
import _ from 'lodash';
import preloader from '../../assets/preloader.gif';
import s from './weatherStyle.module.css';
import { kelvinToFahrenheit } from '../../utils/kelvinToFahrenheit.js';
import { kelvinToCelsius } from '../../utils/kelvinToCelsius.js';
import { getWeatherIcon } from '../../utils/getWeatherIcon.js';



const WeatherContainer = () => {

	const [weatherObj, setWeatherObj] = useState(null);
	const [temp, setTemp] = useState();
	const [active, setActive] = useState('celsius');
	const [icon, setIcon] = useState();

	const getWeather = async (latitude, longitude) => {
		const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=42a887f939302b80f3235cd0c2ff81f1`);

		setWeatherObj(result.data);
		const convertTempToCelsius = kelvinToCelsius(result.data.main.temp);
		setTemp(convertTempToCelsius);
		const icon = await getWeatherIcon(result.data.weather[0].main);
		setIcon(icon);
	};

	const getGeoLocation = () => {
		if ("geolocation" in navigator) {
			function geo_success(position) {
				getWeather(position.coords.latitude, position.coords.longitude);
			}

			function geo_error() {
				console.log("Нет доступа к геопозиции");
			}

			let geo_options = {
				enableHighAccuracy: true,
				maximumAge: 30000,
				timeout: 27000
			};

			navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
		} else {
			console.log('Геопозиция недоступна');
		}
	}


	useEffect(() => {
		getGeoLocation();
	}, []);




	const refresh = () => {
		getGeoLocation();
		setTemp(weatherObj.main.temp);
		setActive('celsius');
	}

	const handleClickDebounce = _.debounce(refresh, 2000);



	const clickC = () => {
		const newTemp = kelvinToCelsius(weatherObj.main.temp);
		setTemp(newTemp);
		setActive('celsius');
		return newTemp;
	}

	const clickF = () => {
		const newTemp = kelvinToFahrenheit(weatherObj.main.temp);
		setTemp(newTemp);
		setActive('fahrenheit');
		return newTemp;
	}





	return (
		weatherObj
			? <Weather refresh={handleClickDebounce} data={weatherObj} clickC={clickC} clickF={clickF} temp={temp} active={active} icon={icon} />
			: <div className={s.preloader}><img src={preloader} alt='preloader' /></div>

	)
};

export { WeatherContainer };
