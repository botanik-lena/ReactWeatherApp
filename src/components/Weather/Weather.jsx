import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash.debounce';
import weatherRequest from '../../API/weatherRequest';
import getGeolocation from '../../utils/getGeolocation';
import Card from './Card/Card';
import preloader from '../../assets/preloader.gif';
import styles from './weather.module.css';
import { convertKelvinToFahrenheit, convertKelvinToCelsius } from '../../utils/temperatureConversion';
import getWeatherIcon from '../../utils/getWeatherIcon';
import Error from './Error/Error';
import UNIT from '../../constants';

const getWeather = async ({ latitude, longitude }, handleWeatherResponse, setError) => {
	try {
		const result = await weatherRequest(latitude, longitude);
		await handleWeatherResponse(result);
	} catch (err) {
		setError(err.message);
	}
};

function Weather() {
	const [weatherResponse, setWeatherResponse] = useState(null);
	const [temperature, setTemperature] = useState();
	const [unitTemperature, setUnitTemperature] = useState(UNIT.CELSIUS);
	const [weatherIcon, setWeatherIcon] = useState();
	const [error, setError] = useState('');
	const [isLoading, setIsLoading] = useState(true);

	const handleWeatherResponse = async ({ data }) => {
		try {
			if (data !== null) {
				const iconDescription = await getWeatherIcon(data.weather[0].main);
				const celsiusTemp = convertKelvinToCelsius(data.main.temp);
				setWeatherResponse(data);
				setTemperature(celsiusTemp);
				setWeatherIcon(iconDescription);
				setUnitTemperature(UNIT.CELSIUS);
			} else {
				setError('Data receipt error.');
			}
			setIsLoading(false);
		} catch (err) {
			setError(err.message);
		}
	};

	const refreshPage = async () => {
		await getGeolocation((coords) => {
			getWeather(coords, handleWeatherResponse, setError);
		}, (errorMessage) => {
			setError(errorMessage);
		});

		setIsLoading(true);
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
			? <div className={styles.preloader}><img src={preloader} alt="preloader" /></div>
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
