const getTime = () => {
	const currentDate = new Date();
	let minutes = currentDate.getMinutes();
	let hours = currentDate.getHours();

	hours = hours > 10 ? hours : `0${hours}`;
	minutes = minutes > 10 ? minutes : `0${minutes}`;

	return [hours, minutes];
};

export default getTime;
