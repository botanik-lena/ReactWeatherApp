import React, { useState, useEffect, useCallback } from 'react';
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
import UNIT from '../../constants';

function Weather() {
	const [weatherResponse, setWeatherResponse] = useState(null);
	const [temperature, setTemperature] = useState();
	const [unitTemperature, setUnitTemperature] = useState(UNIT.CELSIUS);
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
			setUnitTemperature(UNIT.CELSIUS);
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

	const refreshPage = () => {
		getGeolocation().then(({ latitude, longitude }) => {
			setIsLoading(true);
			getWeather(latitude, longitude);
		}).catch((err) => {
			setError(err);
		});
	};

	useEffect(() => {
		refreshPage();
	}, []);

	const onHandleReloadButtonClick = useCallback(debounce(refreshPage, 1000), [refreshPage]);

	const onHandleCelsiusButtonClick = () => {
		const newTemp = convertKelvinToCelsius(weatherResponse.main.temp);
		setTemperature(newTemp);
		setUnitTemperature(UNIT.CELSIUS);
	};
	const onHandleFahrenheitButtonClick = () => {
		const newTemp = convertKelvinToFahrenheit(weatherResponse.main.temp);
		setTemperature(newTemp);
		setUnitTemperature(UNIT.FAHRENHEIT);
	};

	if (error) return <Error errorMessage={error} />;

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
