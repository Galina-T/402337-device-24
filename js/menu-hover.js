"use strict";

var menuFirstLink = document.querySelector(".menu-first-link");
var menuCatalogWrapper = document.querySelector(".menu-catalog-wrapper");
var menuCatalogLinks = document.querySelectorAll(".menu-catalog-link");

function removeMenuShow (el, nameClass) {
  if (el.relatedTarget && el.relatedTarget.classList.contains(nameClass)) {
    return;
  }
  menuCatalogWrapper.classList.remove("menu-show");
}

menuFirstLink.addEventListener("focus", function () {
  menuCatalogWrapper.classList.add("menu-show");
});

menuFirstLink.addEventListener("blur", function (evt) {
  removeMenuShow(evt, "menu-catalog-link");
});

Array.prototype.forEach.call(menuCatalogLinks, function (el) {
  el.addEventListener("blur", function (evt) {
    removeMenuShow(evt, "menu-catalog-link");
  });
});
