import {
  currentWeatherRef,
  fourDayForecastRef,
  toFahrenheitRef,
} from "./DOM_references.js";
import { saveLocation, showHistory } from "./local_storage.js";
import {
  toCelsius,
  isDuplicateLocation,
  toggleForecast,
  createDate,
} from "./utils.js";
import { weatherTips } from "./weather_tips.js";
import { calculateAverages } from "./calculate_averages.js";
import {
  createHourHTML,
  fourDayFourcastHTML,
  getCurrentWeatherInterface,
} from "./html.js";
import { dayNames } from "./config.js";
import { threeHourlyForecast } from "./three_hourly_forecast.js";
import { formatValues } from "./format_values.js";

let saveLocationRef;
let forecastButtonRefs;
let forecastSectionRefs;
let temperatureRef;

export function currentWeaterInterface(weatherData, isCelsuis, isMPH) {
  const { name } = weatherData.data;
  const { temp, temp_max, temp_min, pressure, humidity, feels_like } =
    weatherData.data.main;
  const { description, icon } = weatherData.data.weather[0];
  const { sunrise, sunset } = weatherData.data.sys;
  const { visibility, dt } = weatherData.data;
  let { speed } = weatherData.data.wind;
  const { all } = weatherData.data.clouds;
  const { lon, lat } = weatherData.data.coord;

  weatherTips(visibility, speed, humidity, temp, all);

  let {
    maximumTemp,
    minimumTemp,
    realFeel,
    visibilityKm,
    wind,
    sunriseUnix,
    sunsetUnix,
    timeCalcuated,
  } = formatValues(
    temp_max,
    temp_min,
    feels_like,
    visibility,
    speed,
    sunrise,
    sunset,
    dt
  );

  currentWeatherRef.style.background = "none";

  currentWeatherRef.innerHTML = getCurrentWeatherInterface(
    name,
    timeCalcuated,
    realFeel,
    description,
    icon,
    maximumTemp,
    minimumTemp,
    wind,
    visibilityKm,
    pressure,
    humidity,
    sunriseUnix,
    sunsetUnix,
    isDuplicateLocation(lat, lon, name),
    isCelsuis,
    isMPH
  );

  saveLocationRef = document.getElementById("save-location");
  saveLocationRef.addEventListener("click", () => {
    saveLocation(lon, lat, name);
    showHistory();
  });
}

export function forecastInterface(weatherData, currentDate, isCelsuis) {
  const { list } = weatherData.data;
  fourDayForecastRef.innerHTML = "";
  let counter = 0;

  for (let i = 0; i < list.length; i++) {
    if (i % 8 == 0 && i != 0) {
      let { icon } = list[i].weather[0];
      counter++;
      let { time, hourlyMax, rainProbability, icons } = threeHourlyForecast(
        currentDate + counter,
        list
      );
      const averages = calculateAverages(
        list,
        new Date(list[i].dt * 1000).getDate()
      );
      let { minTemp, maxTemp } = averages;

      let minimumTemp = toCelsius(minTemp);
      let maximumTemp = toCelsius(maxTemp);
      let formatDay = dayNames[createDate(list[i].dt).getDay()];
      let formatDate = new Date(createDate(list[i].dt)).getDate();

      let dailyForecast = createHourHTML(
        time,
        icons,
        hourlyMax,
        rainProbability,
        isCelsuis
      );
      fourDayForecastRef.insertAdjacentHTML(
        "beforeend",
        fourDayFourcastHTML(
          formatDay,
          formatDate,
          icon,
          maximumTemp,
          minimumTemp,
          dailyForecast,
          isCelsuis
        )
      );

      time.length = 0;
      hourlyMax.length = 0;
      icons.length = 0;
      rainProbability.length = 0;
    }
  }
  forecastButtonRefs = document.getElementsByClassName("forecast-button");
  forecastSectionRefs = document.getElementsByClassName("forecast-body");
  for (let i = 0; i < forecastButtonRefs.length; i++) {
    toggleForecast(forecastButtonRefs[i], forecastSectionRefs[i]);
  }
}
