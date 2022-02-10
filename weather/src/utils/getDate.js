
const getDate = () => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const now = new Date().toLocaleDateString('en-GB', options); 
    
    return now;
};

export { getDate };
