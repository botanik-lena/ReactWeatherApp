import axios from 'axios';

const KEY = process.env.REACT_APP_WEATHER_API_KEY;
const baseURL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeatherAPI = (latitude, longitude) => axios.get(`${baseURL}?lat=${latitude}&lon=${longitude}&appid=${KEY}`);

export default getWeatherAPI;
