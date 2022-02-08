import s from './weatherStyle.module.css';

const Weather = (props) => {
    return (
        <div className={s.weather_block}>
            <p>Дата</p>
            <p>Время</p>
            <div>
                <img src="" alt="" />
                <span>City</span>
            </div>
            <img src="" alt="" />
            <p>Облачно</p>

            <div className={s.containColumn}>
                <div className={s.column}>
                    <span>Temp</span> <button>C</button> <button>F</button> 
                    <p>Pressure</p>
                    <p>Sunrise</p>
                </div>
                <div className={s.column}>
                    <p>Wind</p>
                    <p>Humidity</p>
                    <p>Sunset</p>
                </div>
            </div>
            <button>Reload</button>
        </div>
    );
};

export { Weather };