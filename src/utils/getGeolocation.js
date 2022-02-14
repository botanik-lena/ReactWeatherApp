const getGeolocation = (getWeather) => {
	if ('geolocation' in navigator) {
		const geoSuccess = (position) => {
			getWeather(position.coords.latitude, position.coords.longitude);
		};

		const geoError = () => {
			alert('There is no access to the location.');
		};

		const geoOptions = {
			enableHighAccuracy: true,
			maximumAge: 30000,
			timeout: 27000,
		};

		navigator.geolocation.watchPosition(geoSuccess, geoError, geoOptions);
	} else {
		alert('The location is not available.');
	}
};

export default getGeolocation;
