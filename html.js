import { formatTime, toCelsius, selectRainImage } from "./utils.js";

export const getCurrentWeatherInterface = (
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
  duplicate,
  isCelsuis,
  isMPH
) => {
  return `
    <div class="current-weather-container">
    <div  class="weather-description ">
    <div class="current-weather-heading">
        <h2 id="location-name">${name}</h2>
        <p class="calcuated-time">Calculated at ${formatTime(timeCalcuated)}</p>
      </div>
        <button id="save-location" class="add-location" ${
          duplicate ? "disabled" : ""
        }>${duplicate ? "Already Saved " : "Save"}</button>
    </div>

       
        <div class="weather-description">
            <p>Feels like</p>
            <p class="temperature temp">${getTemp(isCelsuis, realFeel)}</p>
        </div>
        
        <div class="inner-weather-container">
            <p class="caption"> Weather Today: ${description}</p>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
            </div>
          </div>
    </div>
  
        <div class="weather-container">
          <div class="weather-unit"><i class="fa-solid fa-temperature-three-quarters"></i> <span class="weather-unit-title">High/Low</span>
           <p><span class="temp">${getTemp(
             isCelsuis,
             maximumTemp
           )}</span>/<span class="temp">${getTemp(
    isCelsuis,
    minimumTemp
  )}</span></p>
          </div>
          <div class="weather-unit"><i class="fa-solid fa-wind"></i><span class="weather-unit-title">Wind</span> <span class="wind">${getWind(
            isMPH,
            wind
          )}</span></div>
          <div class="weather-unit"><i class="fa-regular fa-eye"></i><span  class="weather-unit-title">Visibility</span> <span>${visibilityKm}km</span></div>
          <div class="weather-unit"><i class="fa-solid fa-exclamation"></i><span class="weather-unit-title">Pressure</span> <span>${pressure}hPa</span></div>
          <div class="weather-unit"><i class="fa-solid fa-water"></i><span class="weather-unit-title">Humidity</span> <span>${humidity}%</span></div>
          <div class="weather-unit"> <i class="fa-regular fa-sun"></i> <span class="weather-unit-title">Sunrise</span> <span>${formatTime(
            sunriseUnix
          )}</span>
          </div>
          <div class="weather-unit">
            <i class="fa-regular fa-moon"></i> <span class="weather-unit-title">Sunset</span> <span>${formatTime(
              sunsetUnix
            )}</span>
          </div>
        </div>`;
};

export function carousel(rainHTML, tempComparisonHTML, currentRainHTML) {
  return `
  
  <div class="slide-container" id="slide-container">

<div class="slide">
  <img src="./images/rain.png"/>
  <div class="overlay">
  <h2>Rain Prediction</h2>
  <p>${rainHTML}</p>
  </div>
</div>

<div class="slide">
<img src="./images/sky.png"/>
<div class="overlay">
<h2>Tomorrow's Weather</h2>
<p>${tempComparisonHTML}</p>
</div>
</div>

<div class="slide">
<img src="./images/rainprop.png"/>
<div class="overlay">
<h2>Current Rain</h2>
<p>${currentRainHTML}</p>
</div>
</div>

</div>

<div class="button-container">
<button class="carousel-btn btn-left" id="left-button"><i class="fa-solid fa-chevron-left"></i></button>
<button class="carousel-btn btn-right" id="right-button"><i class="fa-solid fa-chevron-right"></i></button>

</div>
`;
}

export function createHourHTML(
  time,
  icons,
  hourlyMax,
  rainProbability,
  isCelsuis
) {
  const dailyForecast = [];
  for (let i = 0; i < time.length; i++) {
    let formatHour = formatTime(new Date(time[i] * 1000));
    let formatTemp = toCelsius(hourlyMax[i]);
    let formatRainProp = Math.round(rainProbability[i] * 100);

    let hour = `
    <div class="hour-forecast"><img class="icon"src="https://openweathermap.org/img/wn/${
      icons[i]
    }@2x.png"/><span class="time">${formatHour}</span><span class="temperature temp">${getTemp(
      isCelsuis,
      formatTemp
    )}</span>
   <span>${formatRainProp}%</span> <img src="./images/raindrops_icon_${selectRainImage(
      formatRainProp
    )}.png"/></div>`;
    dailyForecast.push(hour);
  }

  return dailyForecast;
}

export function fourDayFourcastHTML(
  formatDay,
  formatDate,
  icon,
  maximumTemp,
  minimumTemp,
  dailyForecast,
  isCelsuis
) {
  return `
  <div class="forecast-container">
          <button type="button" class="forecast-button">
          <h3> ${formatDay} ${formatDate} </h3>
          <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
  <p> <span class="high temp"> ${getTemp(
    isCelsuis,
    maximumTemp
  )}</span>/<span class="temp">${getTemp(isCelsuis, minimumTemp)}</span><p> 
    </button>
    <div class="forecast-body">
    ${dailyForecast.join("")}
    </div>
    <div>
        `;
}

//switch
export function tempComparison(todayTemp, tomorrowTemp) {
  if (todayTemp == tomorrowTemp) {
    return `<p>Today's average temperature is same as tomorrow's</p>`;
  } else if (tomorrowTemp > todayTemp) {
    return `<p>Tomorrow's average temperature will be warmer than today</p>`;
  } else {
    return `<p>Tomorrrow's average temperature will be colder than today</p>`;
  }
}

export function rainPrediction(counter, hourCounter) {
  counter++;
  hourCounter++;
  let rainHTML;

  switch (true) {
    case counter === 1:
      rainHTML = `<p>It will rain in the next 3 hours</p>`;
      break;
    case counter === 39:
      rainHTML = `<p>No rain predicted in the next 4 days</p>`;
      break;
    case counter < 1 && counter >= hourCounter:
      rainHTML = `<p>Next chance of rain in ${Math.round(
        ((counter - hourCounter) * 3) / 24
      )} days</p>`;
      break;
    default:
      rainHTML = `<p>Next chance of rain in ${Math.round(
        hourCounter * 3
      )} hours </p>`;
      break;
  }

  return rainHTML;
}

export function currentRain(rain) {
  if (!rain) {
    return `<p>No rain currently</p>`;
  } else {
    return `<p>${rain}mm of rain in the next 3 hours</p>`;
  }
}

function getTemp(isCelsuis, temp) {
  return `${isCelsuis ? temp : Math.round((temp - 32) / 1.8)}${
    isCelsuis ? "&deg;" : "F"
  }`;
}

function getWind(isMPH, wind) {
  return `${isMPH ? wind : Math.round(wind * 1.60934)} ${
    isMPH ? "MPH" : "KPH"
  }`;
}
