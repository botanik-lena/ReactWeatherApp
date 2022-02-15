const windDirection = (degrees) => {
	if ((degrees >= 0) && (degrees <= 45)) {
		return 'windDirectionArrow45';
	} if ((degrees > 45) && (degrees <= 90)) {
		return 'windDirectionArrow90';
	} if ((degrees > 90) && (degrees <= 135)) {
		return 'windDirectionArrow135';
	} if ((degrees > 135) && (degrees <= 180)) {
		return 'windDirectionArrow225';
	} if ((degrees > 225) && (degrees <= 270)) {
		return 'windDirectionArrow270';
	} return 'windDirectionArrow360';
};

export default windDirection;
