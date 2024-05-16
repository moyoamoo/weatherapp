import { weatherPredictionsRef, weatherTipsRef } from "./DOM_references.js";
import { toCelsius, average, controlCarousel } from "./utils.js ";
import {
  rainPrediction,
  tempComparison,
  carousel,
  currentRain,
} from "./html.js";
import { calculateAverages } from "./calculateAverages.js";
import { createRainCounter } from "./createRainCounter.js";
import { currentDate } from "./entry.js";

export const predictions = (weatherData) => {
  const { list } = weatherData.data;
  let dailyAverage;
  let nextDayAverage;
  let { rain } = list[0];
  rain = rain ? rain["3h"] : undefined;

  const {counter, hourCounter} = createRainCounter(list, currentDate)

  dailyAverage = calculateAverages(list, currentDate);
  nextDayAverage = calculateAverages(list, currentDate + 1);

  let { maxTemp: dailyMax, minTemp: dailyMin } = dailyAverage;
  let { maxTemp: nextMax, minTemp: nextMin } = nextDayAverage;

  let todayTemp = average(dailyMax, dailyMin);
  let tomorrowTemp = average(nextMax, nextMin);

  weatherPredictionsRef.innerHTML = carousel(
    rainPrediction(counter, hourCounter),
    tempComparison(todayTemp, tomorrowTemp),
    currentRain(rain)
  );

  controlCarousel();
};
