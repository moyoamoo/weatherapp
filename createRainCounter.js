import { createDate } from "./utils.js";
import { currentDate } from "./entry.js";

export const createRainCounter = (list) => {
  let counter = 0;
  let hourCounter = 0;

  list.forEach((forecast) => {
    let { pop } = forecast;
    let { dt } = forecast;
    while (createDate(dt).getDate() == currentDate) {
      hourCounter++;
      break;
    }
    while (pop < 0) {
      counter++;
      break;
    }
  });

  return { counter, hourCounter };
};
