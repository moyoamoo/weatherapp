import { weatherPredictionsRef } from "./DOM_references.js";
import { average } from "./utils.js ";
import {
  rainPrediction,
  tempComparison,
  carousel,
  currentRain,
} from "./html.js";
import { controlCarousel } from "./control_carousel.js";
import { calculateAverages } from "./calculate_averages.js";
import { createRainCounter } from "./create_rain_counter.js";
import { currentDate } from "./entry.js";

export const predictions = (weatherData) => {
  const { list } = weatherData.data;

  let { rain } = list[0];
  rain = rain ? rain["3h"] : undefined;

  const { counter, hourCounter } = createRainCounter(list, currentDate);

  const dailyAverage = calculateAverages(list, currentDate);
  const nextDayAverage = calculateAverages(list, currentDate + 1);

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
