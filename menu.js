import { hamburgerRef, navigationRef } from "./DOM_references.js";
// import { getLocations } from "./local_storage.js";

export function setupMenu() {
  hamburgerRef.addEventListener("click", () => {
    navigationRef.style.display === "block"
      ? (navigationRef.style.display = "none")
      : (navigationRef.style.display = "block");
  });
}

