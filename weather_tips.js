import { weatherTipsRef } from "./DOM_references.js";
import { toCelsius } from "./utils.js ";


export const tip = (weatherTip) => {
  return weatherTipsRef.insertAdjacentHTML(
    "beforeend",
    `<div class="tip">
<span>${weatherTip}</span>
</div>`
  );
}

export const weatherTips = (visibility, speed, humidity, temp, all) =>{
  let cloudy = all;
  weatherTipsRef.innerHTML = "";
  let visibilityKm= visibility / 1000;
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
    visibilityKm >= 6 &&
    speedMPH <= 12 &&
    cloudy <= 20
  ) {
    tip("Great conditions for walking");
  } else if (
    toCelsius(temp) >= 12 &&
    visibilityKm >= 6 &&
    speedMPH <= 12 &&
    cloudy <= 25
  ) {
    tip("Good conditions for walking");
  } else if (
    toCelsius(temp) >= 10 &&
    visibilityKm >= 6 &&
    speedMPH <= 18 &&
    cloudy <= 30
  ) {
    tip("Okay conditions for walking");
  } else {
    tip("Not great conditions for walking");
  }
}
