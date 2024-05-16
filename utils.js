import { getLocations } from "./local_storage.js";

export const createDate = (value) => {
  return new Date(value * 1000);
};

export const toCelsius = (value) => {
  return Math.round(value - 273.15);
};

export const formatTime = (unixTime) => {
  return unixTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

export const selectRainImage = (value) => {
  if (value === 0) {
    return 0;
  } else {
    return 1;
  }
};

export const average = (max, min) => {
  let average = Math.round(max + min / 2);
  return average;
};

export const toggleForecast = (buttonRef, sectionRef) => {
  buttonRef.addEventListener("click", () => {
    sectionRef.style.display === "flex"
      ? (sectionRef.style.display = "none")
      : (sectionRef.style.display = "flex");
  });
};

export const isDuplicateLocation = (lat, lon, name) => {
  let locations = getLocations();
  if (!locations) {
    return;
  }
  return locations.some((item) => {
    return item.lat == lat && item.lon == lon && item.name == name;
  });
};
