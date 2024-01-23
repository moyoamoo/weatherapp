import { weatherPredictionsRef, weatherTipsRef } from "./DOM_references.js";
import {
  toCelsius,
  calculateAverages,
  average,
  controlCarousel,
} from "./utils.js ";
import { rainPrediction, tempComparison, carousel, currentRain} from "./html.js";

export function tip(weatherTip) {
  return weatherTipsRef.insertAdjacentHTML(
    "beforeend",
    `<div class="tip">
<span>${weatherTip}</span>
</div>`
  );
}

export function weatherTips(visibility, speed, humidity, temp, all) {
  let cloudy = all;

  weatherTipsRef.innerHTML = "";

  //format values
  let visibilityKM = visibility / 1000;
  let speedMPH = Math.round(speed * 2.23694);
  let humidityPercentage = Math.round(humidity * 100);

  weatherTipsRef.insertAdjacentHTML(
    "beforeend",
    `<h3 class="subtitle">Weather Tips</h3>`
  );

  if (toCelsius(temp) >= 20) {
    tip("Sunscreen is recommended");
  }

  if (cloudy >= 75) {
    tip("Cloudy, poor view of skyline");
  } else if (cloudy < 75 && cloudy > 25) {
    tip("Slightly cloudy, moderate view of skyline");
  } else if (cloudy <= 25) {
    tip("Light clouds, good  view of skyline");
  } else if (cloudy === 0) {
    tip("No clouds, great view of skyline");
  }

  if (humidityPercentage >= 65 && toCelsius(temp) >= 25) {
    tip("High Humidity, keep hydrated");
  }

  if (toCelsius(temp) <= 11) {
    tip("Cold weather, winter coat is recommened");
  }
  if (
    toCelsius(temp) >= 15 &&
    visibilityKM >= 6 &&
    speedMPH <= 12 &&
    cloudy <= 20
  ) {
    tip("Great conditions for walking");
  } else if (
    toCelsius(temp) >= 12 &&
    visibilityKM >= 6 &&
    speedMPH <= 12 &&
    cloudy <= 25
  ) {
    tip("Good conditions for walking");
  } else if (
    toCelsius(temp) >= 10 &&
    visibilityKM >= 6 &&
    speedMPH <= 18 &&
    cloudy <= 30
  ) {
    tip("Okay conditions for walking");
  } else {
    tip("Not great conditions for walking");
  }
}

export function predictions(weatherData) {
  const { list } = weatherData.data;
  let counter = 0;
  let hourCounter = 0;
  let currentDay = new Date();
  let currentDate = currentDay.getDate();
  let dailyAverage;
  let nextDayAverage;
  let rainVolume
  



  for (let i = 0; i < list.length; i++) {
    let { pop } = list[i];
    let { dt } = list[i];
    let {rain} = list[0];
    rainVolume = Object.values(rain);
    
    while (new Date(dt * 1000).getDate() == currentDate) {
      hourCounter++;
      break;
    }

    while (pop < 0) {
      counter++;
      break;
    }
  
  }


console.log(rainVolume)

  dailyAverage = calculateAverages(list, currentDate);
  nextDayAverage = calculateAverages(list, currentDate + 1);

  let { maxTemp: dailyMax, minTemp: dailyMin } = dailyAverage;
  let { maxTemp: nextMax, minTemp: nextMin } = nextDayAverage;

  let todayTemp = average(dailyMax, dailyMin);
  let tomorrowTemp = average(nextMax, nextMin);

  weatherPredictionsRef.innerHTML = carousel(
    rainPrediction(counter, hourCounter),
    tempComparison(todayTemp, tomorrowTemp), 
    currentRain(rainVolume)
  );

  controlCarousel();
}
