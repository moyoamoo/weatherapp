export const calculateAverages = (data, day) => {
  let maxTemp = 0;
  let minTemp = 999;
  data.forEach((forecast) => {
    if (new Date(forecast.dt * 1000).getDate() === day) {
      if (forecast.main.temp_max > maxTemp) {
        maxTemp = forecast.main.temp_max;
      }
      if (forecast.main.temp_min < minTemp) {
        minTemp = forecast.main.temp_min;
      }
    }
  });

  return { maxTemp, minTemp };
};
