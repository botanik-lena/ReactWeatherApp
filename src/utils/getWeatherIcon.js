import getImagesWithTimeOfDay from './getImagesWithTimeOfDay';
import { getCurrentTime } from './getTimeDate';

const BEGIN_DAY = 3;
const END_DAY = 17;

const getWeatherIcon = async (description) => {
	const [hours] = getCurrentTime();
	const isDay = (hours > BEGIN_DAY) && (hours < END_DAY);
	return getImagesWithTimeOfDay(description, isDay);
};

export default getWeatherIcon;
