const DIFFERENCE_BETWEEN_DEGREES = 273;

const kelvinToFahrenheit = (kelvin) => {
	const fahrenheit = 1.8 * (kelvin - DIFFERENCE_BETWEEN_DEGREES) + 32;
	return Math.round(fahrenheit);
};

export default kelvinToFahrenheit;
