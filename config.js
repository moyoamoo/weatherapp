export const dayNames = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

const apiKey = "fbe4c2e2d244f8643bc2bac3de799ba9"


export function getUserLocationURL(userLocation){
  return `http://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&limit=5&appid=${apiKey}`
}

export function getWeatherURL(latitude, longitude){
  return `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${apiKey}`
}

export function getForecastURL(latitude, longitude){
  return `https://api.openweathermap.org/data/2.5/forecast/?lat=${latitude}&lon=${longitude}&appid=${apiKey}`
  
 }