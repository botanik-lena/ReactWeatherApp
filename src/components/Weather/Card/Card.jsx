import React from 'react';
import styles from './card.module.css';
import Date from '../Date/Date';
import Time from '../Time/Time';
import WeatherIcon from '../WeatherIcon/WeatherIcon';
import Location from '../Location/Location';
import Button from '../Button/Button';
import WeatherDescription from '../WeatherDescription/WeatherDescription';

function Card(
	{
		temperature,
		unitTemperature,
		data,
		onHandleRefreshPage,
		weatherIcon,
		onHandleCelsiusButtonClick,
		onHandleFahrenheitButtonClick,
	},
) {
	const { pressure, humidity } = data.main;
	const { sunrise, sunset } = data.sys;
	const windSpeed = data.wind.speed;
	const degrees = data.wind.deg;
	const clouds = data.weather[0].description;
	const city = data.name;
	const buttonReloadStyle = 'reload-button';
	const buttonReloadText = 'Reload';

	return (
		<div className={styles.card}>
			<Date />
			<Time />
			<Location city={city} />
			<WeatherIcon description={clouds} weatherIconPath={weatherIcon} />
			<WeatherDescription
				temperature={temperature}
				unitTemperature={unitTemperature}
				onHandleCelsiusButtonClick={onHandleCelsiusButtonClick}
				onHandleFahrenheitButtonClick={onHandleFahrenheitButtonClick}
				pressure={pressure}
				sunset={sunset}
				sunrise={sunrise}
				humidity={humidity}
				windSpeed={windSpeed}
				degrees={degrees}
			/>
			<Button
				onClick={onHandleRefreshPage}
				className={buttonReloadStyle}
				buttonText={buttonReloadText}
			/>
		</div>
	);
}

export default React.memo(Card);
