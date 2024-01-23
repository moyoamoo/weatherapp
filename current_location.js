export function getCurrentCoordinates(){
    return new Promise((resolve, reject) =>{

        const locationOptions = {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        }
    
        navigator.geolocation.getCurrentPosition(success, error, locationOptions);
    
        function success(locationCoords){
            resolve(locationCoords)
        }
    
        function error(error){
            reject(error)
        }
    
        

    });

}

    

  