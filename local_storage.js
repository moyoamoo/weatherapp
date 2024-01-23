import { getWeatherData, getForecastData } from "./entry.js";
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
  if (index === undefined){
    localStorage.removeItem("locations");
    return;
  }
 
  const locations = getLocations();
  locations.splice(index, 1);
  if (locations.length === 0) {
    localStorage.removeItem("locations");
  } else {
    localStorage.setItem(`locations`, JSON.stringify(locations));
  }
}

export function getLocations() {
  return JSON.parse(localStorage.getItem("locations"));
}

export function showHistory() {
  locations = getLocations();
  const menuListRef = document.getElementById("menu-list");

  if (!locations) {
    menuListRef.innerHTML = "";
    return;
  }

  const html = locations.map((item, index) => {
    return `<li id="${item.lon},${item.lat}">${item.name} <button class="delete" id="${index}"><i class="fa-solid fa-trash"></i></button></li>`;
  });

  menuListRef.innerHTML = `${html.join("")}`;
  menuListRef.addEventListener("click", (e) => {
    const [lat, lon] = e.target.id.split(",");
    getWeatherData(lat, lon);
    getForecastData(lat, lon);
  });

  menuListRef.insertAdjacentHTML(
    "beforeend",
    `<button class="delete-all" id="delete-all">
  Delete All Locations
</button>`
  );

  const deleteAllRef = document.getElementById("delete-all");
  deleteAllRef.addEventListener("click", () => {
    locations = getLocations();
    removeLocation();
    showHistory();
  });

  const deleteButtonRef = document.querySelectorAll(".delete");
  Array.from(deleteButtonRef).forEach((item) => {
    item.addEventListener("click", (e) => {
      removeLocation(e.currentTarget.id);
      showHistory();
    });
  });

}
