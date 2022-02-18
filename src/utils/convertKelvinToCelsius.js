const DIFFERENCE_BETWEEN_DEGREES = 273;

const kelvinToCelsius = (kelvin) => {
	const celsius = kelvin - DIFFERENCE_BETWEEN_DEGREES;
	return Math.round(celsius);
};

export default kelvinToCelsius;
