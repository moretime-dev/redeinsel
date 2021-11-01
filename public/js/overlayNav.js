"use strict";

const closeBtn = document.querySelector(".overlay-nav-close-btn");
const openBtn = document.querySelector(".burger-menu");
const overlayNav = document.querySelector(".overlay-nav");
const body = document.querySelector("body");

openBtn.addEventListener("click", () => {
  overlayNav.style.display = "block";
  body.style.overflow = "hidden";
});

closeBtn.addEventListener("click", () => {
  overlayNav.style.display = "none";
  body.style.overflow = "scroll";
});
