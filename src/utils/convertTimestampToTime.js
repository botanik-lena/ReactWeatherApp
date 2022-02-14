const convertTimestampToTime = (unixTimestamp) => {
	const utcTimestamp = unixTimestamp * 1000;
	const time = new Date(utcTimestamp);
	const hours = time.getHours();
	const minutes = time.getMinutes();
	return [hours, minutes];
};

export default convertTimestampToTime;
