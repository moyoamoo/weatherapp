import { getWeatherData, getForecastData} from "./entry.js";
import { deleteAllRef } from "./DOM_references.js";
import { isLocations } from "./menu.js";

let locations;

export function saveLocation(lon, lat, name) {
  const locations = JSON.parse(localStorage.getItem("locations"));
  if (locations) {
    const duplicate = locations.some((item) => {
      return item.lat == lat && item.lon == lon && item.name == name;
    });
    if (duplicate) {
      return;
    }
    locations.push({ lon, lat, name });
    localStorage.setItem(`locations`, JSON.stringify(locations));
  } else {
    localStorage.setItem("locations", JSON.stringify([{ lon, lat, name }]));
  }
}

export function removeLocation(index) {
  const locations = getLocations();
  locations.splice(index, 1);
  localStorage.setItem(`locations`, JSON.stringify(locations));
}

export function getLocations() {
  return JSON.parse(localStorage.getItem("locations"));
}

export function showHistory() {
  locations = getLocations();
  if (!locations) {
    return;
  }
  const html = locations.map((item, index) => {
    return `<li id="${item.lon},${item.lat}">${item.name} <button class="delete" id="${index}"><i class="fa-solid fa-trash"></i></button></li>`;
  });

  const menuListRef = document.getElementById("menu-list");
  menuListRef.innerHTML = `${html.join("")}`;
  menuListRef.addEventListener("click", (e) => {
    const [lat, lon] = e.target.id.split(",");
    getWeatherData(lat, lon);
    getForecastData(lat, lon);
  });

  const deleteButtonRef = document.querySelectorAll(".delete");
  Array.from(deleteButtonRef).forEach((item) => {
    item.addEventListener("click", (e) => {
      removeLocation(e.currentTarget.id);
      showHistory();
    });
  });
  isLocations();
}

deleteAllRef.addEventListener("click", () => {
  locations = getLocations();
  locations.forEach(removeLocation);
  showHistory();
 
});


