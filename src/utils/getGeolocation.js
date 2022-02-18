const GEO_OPTIONS = {
	enableHighAccuracy: true,
	maximumAge: 30000,
	timeout: 27000,
};

const getGeolocation = () => new Promise((resolve, reject) => {
	if ('geolocation' in navigator) {
		const geoSuccess = (position) => {
			resolve(position.coords);
		};

		const geoError = (error) => {
			reject(error.message);
			alert('There is no access to the location.');
		};

		navigator.geolocation.watchPosition(geoSuccess, geoError, GEO_OPTIONS);
	} else {
		reject();
		alert('The location is not available.');
	}
});

export default getGeolocation;