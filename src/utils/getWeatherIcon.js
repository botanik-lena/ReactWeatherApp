import getImagesWithTimeOfDay from './getImagesWithTimeOfDay';
import getTime from './getTime';

const getWeatherIcon = async (description) => {
	const [hours] = getTime();
	const beginDay = 3;
	const endDay = 17;
	const isDay = (hours > beginDay) && (hours < endDay);
	const result = getImagesWithTimeOfDay(description, isDay);
	return result;
};

export default getWeatherIcon;
