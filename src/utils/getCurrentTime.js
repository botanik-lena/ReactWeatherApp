const getCurrentTime = () => {
	const currentDate = new Date();
	const minutes = currentDate.getMinutes();
	const hours = currentDate.getHours();

	const updateHours = hours < 10 ? `0${hours}` : hours;
	const updateMinutes = minutes < 10 ? `0${minutes}` : minutes;

	return [updateHours, updateMinutes];
};

export default getCurrentTime;
