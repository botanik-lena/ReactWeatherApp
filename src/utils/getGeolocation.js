const GEO_OPTIONS = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000,
};

const getGeolocation = async (setCoords, setErrors) => {
	if ('geolocation' in navigator) {
		const geoSuccess = (position) => {
			setCoords(position.coords);
		};

		const geoError = () => {
			setErrors('There is no access to the location.');
		};

		await navigator.geolocation.watchPosition(geoSuccess, geoError, GEO_OPTIONS);
	} else {
		setErrors('The location is not available.');
	}
};

export default getGeolocation;
