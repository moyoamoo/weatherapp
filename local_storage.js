import { getWeatherData, getForecastData } from "./entry.js";

let locations;

//sav location to local storage
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

//remove function from local storage
export function removeLocation(index) {
  const locations = getLocations();
  locations.splice(index, 1);
  localStorage.setItem(`locations`, JSON.stringify(locations));
}

//get loocation local storage
export function getLocations() {
  return JSON.parse(localStorage.getItem("locations"));
}

//show locations saved in local storage in menu
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

  //delete from menu location from local storage
  const deleteButtonRef = document.querySelectorAll(".delete");
  Array.from(deleteButtonRef).forEach((item) => {
    item.addEventListener("click", (e) => {
      removeLocation(e.currentTarget.id);
      showHistory();
    });
  });
}

const deleteAllRef = document.getElementById("delete-all");
deleteAllRef.addEventListener("click", () => {
  locations = getLocations();
  locations.forEach(removeLocation);
  showHistory();
});
