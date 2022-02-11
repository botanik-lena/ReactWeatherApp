import s from './weatherStyle.module.css';
import { getDate } from '../../utils/getDate.js';
import location from '../../assets/location.svg';
import { getTime } from '../../utils/getTime.js';
import { convertTimestampToTime } from '../../utils/convertTimestampToTime.js';


const Weather = (props) => {

    const pressure = props.data.main.pressure;
    const sunrise = props.data.sys.sunrise;
    const sunset = props.data.sys.sunset;
    const wind = props.data.wind.speed;
    const humidity = props.data.main.humidity;
    const clouds = props.data.weather[0].description;
    const city = props.data.name;
    const icon = props.data.weather[0].icon;

    const [hours, minutes] = getTime();

    console.log(props.data.weather[0].description);



    const [hSunrise, mSunrise] = convertTimestampToTime(sunrise);
    const [hSunset, mSunset] = convertTimestampToTime(sunset);

    



    return (
        <div className={s.weather_block}>
            <p>{getDate()}</p>
            <p className={s.time}>{hours} : {minutes}</p>
            <div>
                <img src={location} alt="" className={s.location}/>
                <span>{city}</span>
            </div>
            <img src={`http://openweathermap.org/img/w/${icon}.png`} alt="icon" className={s.cloudsIcon}/>
            <p>{clouds}</p>

            <div className={s.containColumn}>
                <div className={s.column}>
                    <span>Temp:  {props.temp} </span><button onClick={props.clickC}>C</button> <button onClick={props.clickF}>F</button> 
                    <p>Pressure: {pressure}</p>
                    <p>Sunrise: {hSunrise}:{mSunrise}</p>
                </div>
                <div className={s.column}>
                    <p>Wind: {wind} m/s</p>
                    <p>Humidity: {humidity} %</p>
                    <p>Sunset: {hSunset}:{mSunset}</p>
                </div>
            </div>
            <button onClick={props.refresh}>Reload</button>
        </div>
    );
};

export { Weather };