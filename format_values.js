import { createDate, toCelsius } from "./utils.js";

export const formatValues = (
  temp_max,
  temp_min,
  feels_like,
  visibility,
  speed,
  sunrise,
  sunset,
  dt
) => {
  const maximumTemp = toCelsius(temp_max);
  const minimumTemp = toCelsius(temp_min);
  const realFeel = toCelsius(feels_like);
  const visibilityKm = visibility / 1000;
  const wind = Math.round((speed * 3600) / 1000);

  //Format Data
  const sunriseUnix = new Date(sunrise * 1000);
  const sunsetUnix = new Date(sunset * 1000);
  const timeCalcuated = createDate(dt);

  return {
    maximumTemp,
    minimumTemp,
    realFeel,
    visibilityKm,
    wind,
    sunriseUnix,
    sunsetUnix,
    timeCalcuated,
  };
};
