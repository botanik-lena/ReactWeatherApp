const DIFFERENCE_BETWEEN_DEGREES = 273;

const kelvinToCelsius = (kelvin) => {
	const celsius = kelvin - DIFFERENCE_BETWEEN_DEGREES;
	return Math.round(celsius);
};


const kelvinToFahrenheit = (kelvin) => {
	const fahrenheit = 1.8 * (kelvin - DIFFERENCE_BETWEEN_DEGREES) + 32;
	return Math.round(fahrenheit);
};

export default kelvinToFahrenheit, kelvinToCelsius;
