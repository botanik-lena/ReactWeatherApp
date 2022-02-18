import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import weatherRequest from '../../API/weatherRequest';
import getGeolocation from '../../utils/getGeolocation';
import Weather from './Weather';
import preloader from '../../assets/preloader.gif';
import style from './weatherStyle.module.css';
import convertKelvinToFahrenheit from '../../utils/convertKelvinToFahrenheit';
import convertKelvinToCelsius from '../../utils/convertKelvinToCelsius';
import getWeatherIcon from '../../utils/getWeatherIcon';

const UNIT_CELSIUS = 'celsius';
const UNIT_FAHRENHEIT = 'fahrenheit';

function WeatherContainer() {
	const [weatherResponse, setWeatherResponse] = useState(null);
	const [temperature, setTemperature] = useState();
	const [unitTemperature, setUnitTemperature] = useState(UNIT_CELSIUS);
	const [weatherIcon, setWeatherIcon] = useState();
	const [error, setError] = useState(null);

	const handleWeatherResponse = async ({ data }) => {
		setWeatherResponse(data);
		const celsiusTemp = convertKelvinToCelsius(data.main.temp);
		setTemperature(celsiusTemp);
		const iconDescription = await getWeatherIcon(data.weather[0].main);
		setWeatherIcon(iconDescription);
	};

	const getWeather = async (latitude, longitude) => {
		const result = await weatherRequest(latitude, longitude);
		handleWeatherResponse(result);
	};

	const getGeolocationWithWeather = () => getGeolocation(getWeather);

	useEffect(() => {
		getGeolocation().then(({ latitude, longitude }) => {
			getWeather(latitude, longitude);
		}).catch((err) => {
			setError(err);
		});
	}, []);

	const refreshPage = () => {
		getGeolocationWithWeather();
		setTemperature(weatherResponse.main.temp);
		setUnitTemperature(UNIT_CELSIUS);
	};

	const onHandleReloadButtonClick = debounce(refreshPage, 2000);

	const onHandleCelsiusButtonClick = () => {
		const newTemp = convertKelvinToCelsius(weatherResponse.main.temp);
		setTemperature(newTemp);
		setUnitTemperature(UNIT_CELSIUS);
	};
	const onHandleFahrenheitButtonClick = () => {
		const newTemp = convertKelvinToFahrenheit(weatherResponse.main.temp);
		setTemperature(newTemp);
		setUnitTemperature(UNIT_FAHRENHEIT);
	};

	return (
		weatherResponse
			? (
				<Weather
					onHandleRefreshPage={onHandleReloadButtonClick}
					data={weatherResponse}
					onHandleCelsiusButtonClick={onHandleCelsiusButtonClick}
					onHandleFahrenheitButtonClick={onHandleFahrenheitButtonClick}
					temperature={temperature}
					unitTemperature={unitTemperature}
					weatherIcon={weatherIcon}
				/>
			)
			: <div className={style.preloader}><img src={preloader} alt="preloader" /></div>

	);
}

export default WeatherContainer;
