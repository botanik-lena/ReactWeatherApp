import React, { useState, useEffect } from 'react';
import debounce from 'lodash.debounce';
import weatherRequest from '../../API/weatherRequest';
import getGeolocation from '../../utils/getGeolocation';
import Card from './Card/Card';
import preloader from '../../assets/preloader.gif';
import style from './weather.module.css';
import convertKelvinToFahrenheit from '../../utils/convertKelvinToFahrenheit';
import convertKelvinToCelsius from '../../utils/convertKelvinToCelsius';
import getWeatherIcon from '../../utils/getWeatherIcon';
import Error from './Error/Error';

const UNIT_CELSIUS = 'celsius';
const UNIT_FAHRENHEIT = 'fahrenheit';

function Weather() {
	const [weatherResponse, setWeatherResponse] = useState(null);
	const [temperature, setTemperature] = useState();
	const [unitTemperature, setUnitTemperature] = useState(UNIT_CELSIUS);
	const [weatherIcon, setWeatherIcon] = useState();
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const handleWeatherResponse = async ({ data }) => {
		try {
			setWeatherResponse(data);
			const celsiusTemp = convertKelvinToCelsius(data.main.temp);
			setTemperature(celsiusTemp);
			const iconDescription = await getWeatherIcon(data.weather[0].main);
			setWeatherIcon(iconDescription);
			setUnitTemperature(UNIT_CELSIUS);
			setIsLoading(false);
		} catch (err) {
			setError(err);
		}
	};

	const getWeather = async (latitude, longitude) => {
		try {
			const result = await weatherRequest(latitude, longitude);
			handleWeatherResponse(result);
		} catch (err) {
			setError(err);
		}
	};

	useEffect(() => {
		getGeolocation().then(({ latitude, longitude }) => {
			setIsLoading(true);
			getWeather(latitude, longitude);
		}).catch((err) => {
			setError(err);
		});
	}, []);

	const refreshPage = () => {
		getGeolocation().then(({ latitude, longitude }) => {
			setIsLoading(true);
			getWeather(latitude, longitude);
		}).catch((err) => {
			setError(err);
		});
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

	if (error) return <Error />;

	return (
		isLoading
			? <div className={style.preloader}><img src={preloader} alt="preloader" /></div>
			: (
				<Card
					onHandleRefreshPage={onHandleReloadButtonClick}
					data={weatherResponse}
					onHandleCelsiusButtonClick={onHandleCelsiusButtonClick}
					onHandleFahrenheitButtonClick={onHandleFahrenheitButtonClick}
					temperature={temperature}
					unitTemperature={unitTemperature}
					weatherIcon={weatherIcon}
				/>
			)

	);
}

export default Weather;
