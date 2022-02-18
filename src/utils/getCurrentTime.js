const FIRST_TWO_DIGIT_NUMBER = 10;

const getCurrentTime = () => {
	const currentDate = new Date();
	const minutes = currentDate.getMinutes();
	const hours = currentDate.getHours();

	const updateHours = hours < FIRST_TWO_DIGIT_NUMBER ? `0${hours}` : hours;
	const updateMinutes = minutes < FIRST_TWO_DIGIT_NUMBER ? `0${minutes}` : minutes;

	return [updateHours, updateMinutes];
};

export default getCurrentTime;
