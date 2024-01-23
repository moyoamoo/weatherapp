import { hamburgerRef, navigationRef} from "./DOM_references.js";

export function setupMenu(){
    hamburgerRef.addEventListener("click", () => {
        navigationRef.style.display === "block"
          ? (navigationRef.style.display = "none")
          : (navigationRef.style.display = "block");
      });
}
