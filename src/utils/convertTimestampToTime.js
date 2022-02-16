const convertTimestampToTime = (unixTimestamp) => {
	const utcTimestamp = unixTimestamp * 1000;
	const time = new Date(utcTimestamp);
	const hours = time.getHours();
	const minutes = time.getMinutes();

	const updateHours = hours < 10 ? `0${hours}` : hours;
	const updateMinutes = minutes < 10 ? `0${minutes}` : minutes;

	return [updateHours, updateMinutes];
};

export default convertTimestampToTime;
