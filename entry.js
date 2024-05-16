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
import { getForecastURL, getUserLocationURL, getWeatherURL } from "./config.js";

let temperatureRef;
let saveLocationRef;
let forecastData;
let isCelsuis = true;
let isMPH = true;
let windRef;
let todayWeatherData;
let possibleLocations;
let longitude;
let latitude;
export let currentDay = new Date();
export let currentDate = currentDay.getDate();

detectLocationRef.addEventListener("click", () => {
  getWeatherData();
  getForecastData();
});

searchLocationBtnRef.addEventListener("click", () => {
  let userLocation = searchLocationRef.value;
  getInputLocation(userLocation);
});

export const getInputLocation = async (userLocation) => {
  possibleLocationsRef.innerHTML = "";

  try {
    const { data } = await axios.get(getUserLocationURL(userLocation));
    possibleLocations = data;
    if (data.length === 0) {
      possibleLocationsRef.style.display = "none";
    }
    possibleLocationsRef.style.display = "block";

    let counter = 0;
    data.forEach((location) => {
      possibleLocationsRef.insertAdjacentHTML(
        "beforeend",
        `<option value="${counter++}"><p>${location.name}, ${location.state}, ${
          location.country
        }</p></option>`
      );
    });
  } catch (error) {
    currentWeatherRef.innerHTML = `
    <h2>No Locations Available<h2>
  `;
  }

  if ((possibleLocationsRef.value = "")) {
    currentWeatherRef.innerHTML = `
  <h2>Select a location<h2>
`;
  }
};

possibleLocationsRef.addEventListener("change", (e) => {
  const { lon, lat } = possibleLocations[Number(e.target.value)];
  getWeatherData(lon, lat);
  possibleLocationsRef.style.display = "none";
});

export const getWeatherData = async (lon, lat) => {
  try {
    currentWeatherRef.innerHTML = `  <p>Getting Weather Data</p>
    <span class="loader"></span>`;
    (latitude = lat), (longitude = lon);

    if (!lat || !lon) {
      const currentCoordinates = await getCurrentCoordinates();
      latitude = currentCoordinates.coords.latitude;
      longitude = currentCoordinates.coords.longitude;
    }

    todayWeatherData = await axios.get(getWeatherURL(latitude, longitude));
    currentWeaterInterface(todayWeatherData, isCelsuis, isMPH);

    settingsRef.style.display = "flex";
  } catch (error) {
    currentWeatherRef.innerHTML = `<p>Current Weather Data unavailable</p>`;
  }
};

export const getForecastData = async (lon, lat) => {
  try {
    (latitude = lat), (longitude = lon);

    if (!lat || !lon) {
      const currentCoordinates = await getCurrentCoordinates();
      latitude = currentCoordinates.coords.latitude;
      longitude = currentCoordinates.coords.longitude;
    }

    forecastData = await axios.get(getForecastURL(latitude, longitude));

    forecastInterface(forecastData, currentDate, isCelsuis);
    predictions(forecastData);
  } catch (error) {
    console.log(error);

    fourDayForecastRef.innerHTML = `<div class="main-weather">Forecast not available</div>`;
  }
};

const changeUnit = () => {
  windRef = document.getElementsByClassName("wind");
  temperatureRef = document.getElementsByClassName("temp");
  toFahrenheitRef.addEventListener("click", () => {
    isCelsuis = !isCelsuis;
    forecastInterface(forecastData, currentDate, isCelsuis);
    currentWeaterInterface(todayWeatherData, isCelsuis, isMPH);
    !isCelsuis
      ? (toFahrenheitRef.innerText = `Celsuis`)
      : (toFahrenheitRef.innerText = `Fahrenheit`);
  });

  windRef = document.getElementsByClassName("wind");
  toKilometersRef.addEventListener("click", () => {
    isMPH = !isMPH;
    currentWeaterInterface(todayWeatherData, isCelsuis, isMPH);
    !isMPH
      ? (toKilometersRef.innerText = `Meters per Hour`)
      : (toKilometersRef.innerText = `Kilometers per Hour`);
  });
};

showHistory();
changeUnit();
setupMenu();
