import getImagesWithTimeOfDay from './getImagesWithTimeOfDay';
import getCurrentTime from './getCurrentTime';

const BEGIN_DAY = 3;
const END_DAY = 17;

const getWeatherIcon = async (description) => {
	const [hours] = getCurrentTime();
	const isDay = (hours > BEGIN_DAY) && (hours < END_DAY);
	const result = getImagesWithTimeOfDay(description, isDay);
	return result;
};

export default getWeatherIcon;
