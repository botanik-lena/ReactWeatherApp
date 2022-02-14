import axios from 'axios';

const KEY = '42a887f939302b80f3235cd0c2ff81f1';

const getWeatherAPI = (latitude, longitude) => {
	const responseWeather = axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${KEY}`);

	return responseWeather;
};

export default getWeatherAPI;
