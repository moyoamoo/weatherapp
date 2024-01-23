import {
  currentWeatherRef,
  detectLocationRef,
  fourDayForecastRef,
  searchLocationBtnRef,
  searchLocationRef,
  possibleLocationsRef,
  toFahrenheitRef,
  toKilometersRef,
  settingsRef,
} from "./DOM_references.js";
import { getCurrentCoordinates } from "./current_location.js";
import { showHistory } from "./local_storage.js";
import { setupMenu } from "./menu.js";
import { currentWeaterInterface, forecastInterface } from "./actions.js";
import { predictions } from "./weather_segment.js";
import { noLocationEntered } from "./no_location.js";
import { createHourHTML } from "./html.js";

let temperatureRef;
let saveLocationRef;
let isCelsuis = true;
let isMPH = true;
let windRef;
let todayWeatherData;
let possibleLocations;
let longitude;
let latitude;
let currentDay = new Date();
let currentDate = currentDay.getDate();

//desktop mode
//style menu

//display weather data when button is clicked
detectLocationRef.addEventListener("click", () => {
  getWeatherData();
  getForecastData();
});

// get value user enters - send to find co-ordinates
searchLocationBtnRef.addEventListener("click", () => {
  let userLocation = searchLocationRef.value;
  getInputLocation(userLocation);
});

//get users coordinates
export async function getInputLocation(userLocation) {
  possibleLocationsRef.innerHTML = "";

  try {
    const { data } = await axios.get(
      `http://api.openweathermap.org/geo/1.0/direct?q=${userLocation}&limit=5&appid=fbe4c2e2d244f8643bc2bac3de799ba9`
    );
    possibleLocations = data;
    if (data.length === 0) {
      noLocationEntered();
      possibleLocationsRef.style.display = "none";
    }
    possibleLocationsRef.style.display = "block";
    for (let i = 0; i < data.length; i++) {
      possibleLocationsRef.insertAdjacentHTML(
        "beforeend",
        `<option value="${i}"><p>${data[i].name}, ${data[i].state}, ${data[i].country}</p></option>`
      );
    }
  } catch (error) {}

  if ((possibleLocationsRef.value = "")) {
    currentWeatherRef.innerHTML = `
  <h2>Select a location<h2>
`;
  }
}

possibleLocationsRef.addEventListener("change", (e) => {
  const { lon, lat } = possibleLocations[Number(e.target.value)];
  getWeatherData(lon, lat);
  possibleLocationsRef.style.display = "none";
});

export async function getWeatherData(lon, lat) {
  try {
    currentWeatherRef.innerHTML = `  <p>Getting Weather Data</p>
    <span class="loader"></span>`;
    (latitude = lat), (longitude = lon);

    if (!lat || !lon) {
      const currentCoordinates = await getCurrentCoordinates();
      latitude = currentCoordinates.coords.latitude;
      longitude = currentCoordinates.coords.longitude;
    }

    todayWeatherData = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=fbe4c2e2d244f8643bc2bac3de799ba9`
    );
    currentWeaterInterface(todayWeatherData, isCelsuis, isMPH);
    settingsRef.style.display = "flex";
  } catch (error) {
    currentWeatherRef.innerHTML = `<p>Current Weather Data unavailable</p>`;
  }
}

export async function getForecastData(lon, lat) {
  try {
    (latitude = lat), (longitude = lon);

    if (!lat || !lon) {
      const currentCoordinates = await getCurrentCoordinates();
      latitude = currentCoordinates.coords.latitude;
      longitude = currentCoordinates.coords.longitude;
    }

    const forecastData = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast/?lat=${latitude}&lon=${longitude}&appid=fbe4c2e2d244f8643bc2bac3de799ba9`
    );

    forecastInterface(forecastData, currentDate, isCelsuis);
    predictions(forecastData);
  } catch (error) {
    fourDayForecastRef.innerHTML = `<div class="main-weather">Forecast not available</div>`;
  }
}

function changeWindSpeed() {
  windRef = document.getElementsByClassName("wind");
  toKilometersRef.addEventListener("click", () => {
    isMPH = !isMPH;
    currentWeaterInterface(todayWeatherData, isCelsuis, isMPH);
    !isMPH
      ? (toKilometersRef.innerText = `Meters per Hour`)
      : (toKilometersRef.innerText = `Kilometers per Hour`);
  });
}

function changeTemperature() {
  temperatureRef = document.getElementsByClassName("temp");
  toFahrenheitRef.addEventListener("click", () => {
    isCelsuis = !isCelsuis;
    currentWeaterInterface(todayWeatherData, isCelsuis, isMPH);
    !isCelsuis
      ? (toFahrenheitRef.innerText = `Celsuis`)
      : (toFahrenheitRef.innerText = `Fahrenheit`);
  });
}

showHistory();
changeTemperature();
changeWindSpeed();
setupMenu();
