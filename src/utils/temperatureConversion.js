const DIFFERENCE_BETWEEN_DEGREES = 273;

const convertKelvinToCelsius = (kelvin) => {
	const celsius = kelvin - DIFFERENCE_BETWEEN_DEGREES;
	return Math.round(celsius);
};

const convertKelvinToFahrenheit = (kelvin) => {
	const fahrenheit = 1.8 * (kelvin - DIFFERENCE_BETWEEN_DEGREES) + 32;
	return Math.round(fahrenheit);
};

export { convertKelvinToCelsius, convertKelvinToFahrenheit };
