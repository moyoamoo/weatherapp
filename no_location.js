import {
  fourDayForecastRef,
  weatherPredictionsRef,
  currentWeatherRef,
  weatherTipsRef,
} from "./DOM_references.js";

export function noLocationEntered() {
  fourDayForecastRef.innerHTML = "";
  weatherPredictionsRef.innerHTML = "";
  weatherTipsRef.innerHTML = "";
  currentWeatherRef.innerHTML = `
    <div class="toast">
  <h2>Please select a location<h2>
  <button id="close-toast"><i class="fa-solid fa-x"></i></button>
  </div>
 `;
  closeToast();
}

function closeToast() {
  const toastRef = document.getElementsByClassName("toast");
  const closeToastRef = document.getElementById("close-toast");
  closeToastRef.addEventListener("click", () => {
    toastRef[0].innerHTML = "";
    toastRef[0].style.background = "none";
        currentWeatherRef.innerHTML = `<h2>Find Weather For Your Location
    </h2>`
  });
}
