const DIFFERENCE_SECONDS_AND_MILLISECONDS = 1000;
const FIRST_TWO_DIGIT_NUMBER = 10;

const getDate = () => {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	return new Date().toLocaleDateString('en-GB', options);
};

const getCurrentTime = () => {
	const currentDate = new Date();
	const minutes = currentDate.getMinutes();
	const hours = currentDate.getHours();

	const updateHours = hours < FIRST_TWO_DIGIT_NUMBER ? `0${hours}` : hours;
	const updateMinutes = minutes < FIRST_TWO_DIGIT_NUMBER ? `0${minutes}` : minutes;

	return [updateHours, updateMinutes];
};

const convertTimestampToTime = (unixTimestamp) => {
	const utcTimestamp = unixTimestamp * DIFFERENCE_SECONDS_AND_MILLISECONDS;
	const time = new Date(utcTimestamp);
	const hours = time.getHours();
	const minutes = time.getMinutes();

	const updateHours = hours < FIRST_TWO_DIGIT_NUMBER ? `0${hours}` : hours;
	const updateMinutes = minutes < FIRST_TWO_DIGIT_NUMBER ? `0${minutes}` : minutes;

	return [updateHours, updateMinutes];
};

export { getDate, getCurrentTime, convertTimestampToTime };
