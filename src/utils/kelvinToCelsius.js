const kelvinToCelsius = (kelvin) => {
	const differenceBetweenDegrees = 273;
	const celsius = kelvin - differenceBetweenDegrees;
	return Math.round(celsius);
};

export default kelvinToCelsius;
