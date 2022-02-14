import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import getWeatherAPI from '../../API/getWeatherAPI';
import getGeolocation from '../../utils/getGeolocation';
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
		const result = await getWeatherAPI(latitude, longitude);

		setWeatherResponse(result.data);
		const convertTempToCelsius = kelvinToCelsius(result.data.main.temp);
		setTemp(convertTempToCelsius);
		const iconDescription = await getWeatherIcon(result.data.weather[0].main);
		setIcon(iconDescription);
	};

	const getGeolocationWithWeather = () => getGeolocation(getWeather);

	useEffect(() => {
		getGeolocationWithWeather();
	}, []);

	const refreshPage = () => {
		getGeolocationWithWeather();
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
