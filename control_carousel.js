let rightButtonRef;
let leftButtonRef;
let slidesRef;
let slideContainerRef;

export const controlCarousel = () => {
  let slide = 0;

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
};
