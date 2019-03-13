"use strict";

var itemsTitleLinks = document.querySelectorAll(".item-title-link");
var itemHoverBtns = document.querySelectorAll(".item-hover-btn");
var btnsCompare = document.querySelectorAll(".btn-compare");
var itemsHover = document.querySelectorAll(".item-hover");

function removeItemShow (el, nameClass, index) {
  if (el.relatedTarget && el.relatedTarget.classList.contains(nameClass)) {
    return;
  }
  itemsHover[index].classList.remove("item-show");
}

Array.prototype.forEach.call(itemsTitleLinks, function (el, inx) {
  el.addEventListener("focus", function () {
    itemsHover[inx].classList.add("item-show");
  });
});

Array.prototype.forEach.call(itemsTitleLinks, function (el, inx) {
  el.addEventListener("blur", function (evt) {
    removeItemShow(evt, "item-hover-btn", inx);
  });
});

Array.prototype.forEach.call(itemHoverBtns, function (el, inx) {
  el.addEventListener("blur", function (evt) {
    removeItemShow(evt, "btn-compare", inx);
  });
});

Array.prototype.forEach.call(btnsCompare, function (el, inx) {
  el.addEventListener("blur", function (evt) {
    removeItemShow(evt, "item-hover-btn", inx);
  });
});
