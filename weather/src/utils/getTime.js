
const getTime = () => {
    const currentDate = new Date();
    const minutes = currentDate.getMinutes();
    const hours = currentDate.getHours();
    return [hours, minutes];
}

export { getTime };