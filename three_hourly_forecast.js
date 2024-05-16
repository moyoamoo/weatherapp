import { createDate } from "./utils.js";

export const threeHourlyForecast = (date, data) => {
  let time = [];
  let hourlyMax = [];
  let rainProbability = [];
  let icons = [];

  data.forEach((forecast) => {
    if (createDate(forecast.dt).getDate() === date) {
      let { temp_max } = forecast.main;
      let { dt, pop } = forecast;
      let { icon } = forecast.weather[0];

      time.push(dt);
      hourlyMax.push(temp_max);
      rainProbability.push(pop);
      icons.push(icon);
    }
  });

  return { time, hourlyMax, rainProbability, icons };
};
