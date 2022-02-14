const getDate = () => {
	const options = { year: 'numeric', month: 'short', day: 'numeric' };
	const currentDate = new Date().toLocaleDateString('en-GB', options);
	return currentDate;
};
export default getDate;
