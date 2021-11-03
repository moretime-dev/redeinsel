"use strict";

const images = document.querySelectorAll("img");

const galleryFullView = document.querySelector("#gallery-fullview");

const showInFullView = (link) => {
  const fullview = document.getElementById("gallery-fullview"),
    // die Galerie zum geklickten Link
    gallery = link.closest(".bilder"),
    // Das Thumbnail-Bild darin, brauchen wir für ...
    thumb = link.querySelector("img"),
    // ... den Caption-Text, der aus dem alt-Attribut generiert wird.
    caption = thumb ? thumb.alt : "";

  // Den angeklickten Link zum aria-selected Element machen
  link.parentElement
    .querySelectorAll("img[aria-selected]")
    .forEach((link) => link.removeAttribute("aria-selected"));
  link.setAttribute("aria-selected", "true");

  // src-Attribut im Vollbild auf das verlinkte Bild setzen und Caption in figcaption eintragne
  fullview.childNodes[1].src = link.src;

  // Galerie-ID speichern für click-Handler im Fullview und Fullview einblenden (falls noch nicht passiert)

  fullview.classList.add("visible");
};

images.forEach((image) => {
  image.addEventListener("click", (event) => {
    const clickedLink = event.target.closest("img");

    showInFullView(clickedLink);
  });
});

const handleFullViewClick = (e) => {
  const fullview = e.currentTarget;
  const gallery = document.querySelector(".bilder");
  const clickedButton = e.target.closest("button");
  const currentImage = gallery.querySelector("img[aria-selected]");
  let nextImage;

  switch (clickedButton.value) {
    case "close":
      fullview.classList.remove("visible");
      //   gallery.querySelector("a[aria-selected]").focus();
      break;

    case "prev":
      // Ausführliche Version
      nextImage = navigateDOM(
        currentImage,
        (elem) => elem.previousElementSibling,
        (elem) => elem.tagName == "IMG"
      );

      if (!nextImage) nextImage = gallery.querySelector("img:last-of-type");

      showInFullView(nextImage);
      break;

    case "next":
      // Kompaktversion als Einzeiler
      showInFullView(
        navigateDOM(
          currentImage,
          (elem) => elem.nextElementSibling,
          (elem) => elem.tagName == "IMG"
        ) || gallery.querySelector("img:first-of-type")
      );
      break;
    default:
      fullview.classList.remove("visible");
  }
};

function navigateDOM(current, proceed, checkFound) {
  if (!current) return null;
  while ((current = proceed(current))) {
    if (checkFound(current)) break;
  }
  return current;
}

galleryFullView.addEventListener("click", handleFullViewClick);

/** Slider */

const sliderNext = document.querySelector(".slider-next");
const sliderPrev = document.querySelector(".slider-prev");
const singleImages = document.querySelectorAll(".img-gallery");

let translateLeft = 100;
let translateRight = 100;

sliderNext.addEventListener("click", () => {
  singleImages.forEach((img) => {
    img.style.transform = `translate(-${translateLeft}%, 0)`;
    img.style.transition = "all 0.5s ease-in-out";
  });
  if (translateLeft > 300) {
    translateLeft = 0;
  } else translateLeft += 100;
});

// sliderPrev.addEventListener("click", () => {
//   singleImages.forEach((img) => {
//     img.style.transform = `translate(+${translateRight}%, 0)`;
//     img.style.transition = "all 0.5s ease-in-out";
//   });
//   if (translateRight > 300) {
//     translateRight = 0;
//   } else translateRight += 100;
// });
