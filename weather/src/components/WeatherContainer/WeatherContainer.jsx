import { useState, useEffect } from 'react';
import { Weather } from './Weather';
import axios from 'axios';

const WeatherContainer = (props) => {

    const [weatherObj, setWeatherObj] = useState({});

    const getWeather = async (latitude, longitude) => {
        const result = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=42a887f939302b80f3235cd0c2ff81f1`);

        setWeatherObj(result.data);
    };

    
    useEffect(() => {
        if ("geolocation" in navigator) {
            function geo_success(position) {
                getWeather(position.coords.latitude, position.coords.longitude);
            }

            function geo_error() {
                alert("Извините, нет доступной позиции.");
            }

            let geo_options = {
                enableHighAccuracy: true,
                maximumAge        : 30000,
                timeout           : 27000
                };

            let wpid = navigator.geolocation.watchPosition(geo_success, geo_error, geo_options);
        } else {

        }
    }, []);

    console.log(weatherObj);





    return (
        <Weather />
    )
};

export { WeatherContainer };
