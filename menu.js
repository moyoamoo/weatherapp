import { hamburgerRef, navigationRef, deleteAllRef } from "./DOM_references.js";
import { getLocations } from "./local_storage.js";

export function setupMenu() {
  hamburgerRef.addEventListener("click", () => {
    navigationRef.style.display === "block"
      ? (navigationRef.style.display = "none")
      : (navigationRef.style.display = "block");
  });

  isLocations();
}

export function isLocations() {
  let locations = getLocations();
  if (locations.length === 0) {
    deleteAllRef.innerText = `No locations`;
  } else {
    deleteAllRef.innerHTML = `Delete All Locations`;
    deleteAllRef.disabled =  true;
  }
}
