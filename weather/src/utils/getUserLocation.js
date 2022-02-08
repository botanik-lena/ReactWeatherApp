
// export const getUserLocation = async () => {
//     let latitude;
//     let longitude;

//     const success = (position) => {
//         latitude = position.coords.latitude;
//         longitude = position.coords.longitude;   
//     }

//     const error = (err) => {
//         console.warn(`ERROR(${err.code}): ${err.message}`);
//     }

//     if (navigator.geolocation) {
//         await navigator.geolocation.getCurrentPosition(success, error);
//     } else {
//         console.log('Геопозиция недоступна');
//     }
    
// };