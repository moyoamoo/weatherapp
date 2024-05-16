import { getLocations } from "./local_storage.js";

let rightButtonRef;
let leftButtonRef;
let slidesRef;
let slideContainerRef;

export const createDate =(value)=>{
  return new Date(value * 1000)
}

export function toCelsius(value) {
  return Math.round(value - 273.15);
}

export function formatTime(unixTime) {
  return unixTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function selectRainImage(value) {
  if (value === 0) {
    return 0;
  } else {
    return 1;
  }
}


// export function calculateAverages(data, day) {
//   let maxTemp = 0;
//   let minTemp = 999;
//   for (let i = 0; i < data.length; i++) {
//     if (new Date(data[i].dt * 1000).getDate() === day) {
//       if (data[i].main.temp_max > maxTemp) {
//         maxTemp = data[i].main.temp_max;
//       }
//       if (data[i].main.temp_min < minTemp) {
//         minTemp = data[i].main.temp_min;
//       }
//     }
//   }
//   return { maxTemp, minTemp };
// }

export function threeHourlyFourcast(date, list) {
  let time = [];
  let hourlyMax = [];
  let rainProbability = [];
  let icons = [];

  for (let i = 0; i < list.length; i++) {
    if (new Date(list[i].dt * 1000).getDate() === date) {
      let { temp_max } = list[i].main;
      let { dt, pop } = list[i];
      let { icon } = list[i].weather[0];

      time.push(dt);
      hourlyMax.push(temp_max);
      rainProbability.push(pop);
      icons.push(icon);
    }
  }
  return { time, hourlyMax, rainProbability, icons };
}

export function average(max, min) {
  let average = Math.round(max + min / 2);
  return average;
}

export function isDuplicateLocation(lat, lon, name) {
  let locations = getLocations();
  if (!locations){
    return;
  }
  return locations.some((item) => {
    return item.lat == lat && item.lon == lon && item.name == name;
  });
}

export function toggleForecast(buttonRef, sectionRef) {
  buttonRef.addEventListener("click", () => {
    sectionRef.style.display === "flex"
      ? (sectionRef.style.display = "none")
      : (sectionRef.style.display = "flex");
  });
}

let slide = 0;
export function controlCarousel() {
  rightButtonRef = document.getElementById("right-button");
  leftButtonRef = document.getElementById("left-button");
  slidesRef = document.querySelector(".slide");
  slideContainerRef = document.getElementById("slide-container");

  rightButtonRef.addEventListener("click", () => {
    if (slide === 2) {
      slide = -1;
    }
    slideContainerRef.scrollLeft += slidesRef.clientWidth;
    slide++;
  });

  leftButtonRef.addEventListener("click", () => {
    if (slide === 0) {
      slide = 3;
    }
    slideContainerRef.scrollLeft -= slidesRef.clientWidth;
    slide--;
  });

  window.addEventListener("resize", () => {
    slideContainerRef.scrollLeft = slidesRef.clientWidth * slide + 1;

  });
}
