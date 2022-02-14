const kelvinToFahrenheit = (kelvin) => {
	const fahrenheit = 1.8 * (kelvin - 273) + 32;
	return Math.round(fahrenheit);
};

export default kelvinToFahrenheit;
