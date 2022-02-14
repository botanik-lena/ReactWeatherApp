import React, { useState, useEffect } from 'react';
import axios from 'axios';
import debounce from 'lodash.debounce';
import Weather from './Weather';
import preloader from '../../assets/preloader.gif';
import s from './weatherStyle.module.css';
import kelvinToFahrenheit from '../../utils/kelvinToFahrenheit';
import kelvinToCelsius from '../../utils/kelvinToCelsius';
import getWeatherIcon from '../../utils/getWeatherIcon';

function WeatherContainer() {
	const [weatherResponse, setWeatherResponse] = useState(null);
	const [temp, setTemp] = useState();
	const [selectedTemperatureMeasurementUnit, setSelectedTemperatureMeasurementUnit] = useState('celsius');
	const [icon, setIcon] = useState();

	const getWeather = async (latitude, longitude) => {
		const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=42a887f939302b80f3235cd0c2ff81f1`);

		setWeatherResponse(result.data);
		const convertTempToCelsius = kelvinToCelsius(result.data.main.temp);
		setTemp(convertTempToCelsius);
		const iconDescription = await getWeatherIcon(result.data.weather[0].main);
		setIcon(iconDescription);
	};

	const getGeoLocation = () => {
		if ('geolocation' in navigator) {
			const geoSuccess = (position) => {
				getWeather(position.coords.latitude, position.coords.longitude);
			};

			const geoError = () => {
				alert('There is no access to the location.');
			};

			const geoOptions = {
				enableHighAccuracy: true,
				maximumAge: 30000,
				timeout: 27000,
			};

			navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
		} else {
			alert('The location is not available.');
		}
	};

	useEffect(() => {
		getGeoLocation();
	}, []);

	const refreshPage = () => {
		getGeoLocation();
		setTemp(weatherResponse.main.temp);
		setSelectedTemperatureMeasurementUnit('celsius');
	};

	const handleClickDebounce = debounce(refreshPage, 2000);

	const onHandleCelsiusButtonClick = () => {
		const newTemp = kelvinToCelsius(weatherResponse.main.temp);
		setTemp(newTemp);
		setSelectedTemperatureMeasurementUnit('celsius');
		return newTemp;
	};
	const onHandleFahrenheitButtonClick = () => {
		const newTemp = kelvinToFahrenheit(weatherResponse.main.temp);
		setTemp(newTemp);
		setSelectedTemperatureMeasurementUnit('fahrenheit');
		return newTemp;
	};

	return (
		weatherResponse
			? (
				<Weather
					refreshPage={handleClickDebounce}
					data={weatherResponse}
					onHandleCelsiusButtonClick={onHandleCelsiusButtonClick}
					onHandleFahrenheitButtonClick={onHandleFahrenheitButtonClick}
					temp={temp}
					selectedTemperatureMeasurementUnit={selectedTemperatureMeasurementUnit}
					icon={icon}
				/>
			)
			: <div className={s.preloader}><img src={preloader} alt="preloader" /></div>

	);
}

export default WeatherContainer;
