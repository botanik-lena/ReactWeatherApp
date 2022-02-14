
const convertTimestampToTime = (timestamp) => {
    const time = new Date(timestamp * 1000);
    const hours = time.getHours();
    const minutes = time.getMinutes();
    return [hours, minutes];
};

export { convertTimestampToTime };
