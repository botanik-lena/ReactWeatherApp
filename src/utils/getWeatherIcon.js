import { getImagesWithTimeOfDay } from './getImagesWithTimeOfDay.js';
import { getTime } from './getTime.js';

const getWeatherIcon = async(description) => {
    const [hours, ] = getTime();

    const isDay = (hours > 3) && (hours < 17) ? true : false;

    const result = getImagesWithTimeOfDay(description, isDay);
    return result;
};

export { getWeatherIcon };
