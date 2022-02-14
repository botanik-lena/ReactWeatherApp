import snow from '../assets/weatherIcons/snow.png';
import thunderstorm from '../assets/weatherIcons/thunderstorm.svg';
import thunderstormNight from '../assets/weatherIcons/thunderstorm-night.svg';
import rain from '../assets/weatherIcons/rain-day.png';
import rainNight from '../assets/weatherIcons/rain-night.svg';
import clear from '../assets/weatherIcons/clear-sky.svg';
import clearNight from '../assets/weatherIcons/clear-sky-night.svg';
import few from '../assets/weatherIcons/few-clouds.svg';
import fewNight from '../assets/weatherIcons/few-clouds-night.svg';
import mist from '../assets/weatherIcons/mist.svg';
import scattered from '../assets/weatherIcons/scattered-clouds.svg';
import scatteredNight from '../assets/weatherIcons/scattered-clouds-night.svg';

const imagesDay = {
	Snow: snow,
	Thunderstorm: thunderstorm,
	Drizzle: rain,
	Rain: rain,
	Mist: mist,
	Clear: clear,
	Clouds: {
		few,
		scattered,
		broken: few,
		overcast: few,
	},
};

const imagesNight = {
	Snow: snow,
	Thunderstorm: thunderstormNight,
	Drizzle: rainNight,
	Rain: rainNight,
	Mist: mist,
	Clear: clearNight,
	Clouds: {
		few: fewNight,
		scattered: scatteredNight,
		broken: fewNight,
		overcast: fewNight,
	},
};
const getImagesWithTimeOfDay = (description, isDay) => (isDay
	? imagesDay[description]
	: imagesNight[description]);

export default getImagesWithTimeOfDay;
