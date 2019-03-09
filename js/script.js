'use strict';

var writeBtn = document.querySelector(".write-btn");
var writePopup = document.querySelector(".modal-write-us");
var close = writePopup.querySelector(".modal-close");
var form = writePopup.querySelector("form");
var login = writePopup.querySelector("[name=login]");
var email = writePopup.querySelector("[name=email]");
var comment = writePopup.querySelector("[name=comment]");

var isStorageSupport = true;
var storage = "";

try {
  storage = localStorage.getItem("login");
} catch (err) {
  isStorageSupport = false;
}

function checkValide (el) {
  if (el.value) {
    return;
  }
  el.classList.add("invalid-input");
}

function removeInvalide (el) {
  el.classList.remove("invalid-input");
}

writeBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  writePopup.classList.add("modal-show");
  var yScroll = window.scrollY;
  if (storage) {
    login.value = storage;
    email.focus();
  } else {
    login.focus();
  }
  window.scrollTo(0, yScroll);
});

form.addEventListener("submit", function (evt) {
  if (!login.value || !email.value || !comment.value) {
    evt.preventDefault();
    writePopup.classList.add("modal-error");
    checkValide(login);
    checkValide(email);
    checkValide(comment);
  } else {
    if (isStorageSupport) {
      localStorage.setItem("login", login.value);
    }
  }
});

close.addEventListener("click", function (evt) {
  evt.preventDefault();
  writePopup.classList.remove("modal-show");
  writePopup.classList.remove("modal-error");
  removeInvalide(login);
  removeInvalide(email);
  removeInvalide(comment);
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (writePopup.classList.contains("modal-show")) {
      writePopup.classList.remove("modal-show");
      writePopup.classList.remove("modal-error");
      removeInvalide(login);
      removeInvalide(email);
      removeInvalide(comment);
    }
  }
});

var mapLink = document.querySelector(".contact-map-link");
var mapPopup = document.querySelector(".modal-map");
var mapClose = mapPopup.querySelector(".modal-close");

mapLink.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.add("modal-show");
});

mapClose.addEventListener("click", function (evt) {
  evt.preventDefault();
  mapPopup.classList.remove("modal-show");
});

window.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 27) {
    evt.preventDefault();
    if (mapPopup.classList.contains("modal-show")) {
      mapPopup.classList.remove("modal-show");
    }
  }
});

var carousel = document.querySelector(".carousel");
var carouselControls = carousel.querySelector(".carousel-controls");
var carouselInputs = document.querySelectorAll("[name=carousel-toggle]");
var controls = carouselControls.children;
var slides = carousel.querySelector(".carousel-slides-list").children;
var slideOptions = carousel.querySelector(".slide-options");

slides[0].classList.add("slide-show");
controls[0].classList.add("label-active");

carouselControls.style.bottom = (slideOptions.clientHeight + 60) + "px";

carouselControls.addEventListener("click", function (evt) {
  if (evt.target === carouselControls || evt.target.classList.contains("label-active")) {
    return;
  }

  var forLable = evt.srcElement.htmlFor;
  var idSlide = 'carousel-' + forLable;

  Array.prototype.forEach.call(slides, function (element, inx) {
    if (element.id === idSlide) {
      element.classList.add("slide-show");
      evt.target.classList.add("label-active");
    } else {
      element.classList.remove("slide-show");
      controls[inx].classList.remove("label-active");
    }
  });
});

Array.prototype.forEach.call(carouselInputs, function (element) {
  element.addEventListener("keydown", function (evt) {

    var idInput = evt.srcElement.id;
    var idSlide = 'carousel-' + idInput;

    if (evt.keyCode === 39) {
      Array.prototype.forEach.call(slides, function (el, inx, arr) {
        if (el.id !== idSlide) {
          return;
        }

        el.classList.remove("slide-show");
        controls[inx].classList.remove("label-active");
        if (evt.target.nextElementSibling.name !== "carousel-toggle") {
          arr[0].classList.add("slide-show");
          controls[0].classList.add("label-active");
        } else {
          arr[inx + 1].classList.add("slide-show");
          controls[inx + 1].classList.add("label-active");
        }
      });
    }
    if (evt.keyCode === 37) {
      Array.prototype.forEach.call(slides, function (el, inx, arr) {
        if (el.id !== idSlide) {
          return;
        }

        el.classList.remove("slide-show");
        controls[inx].classList.remove("label-active");
        if (evt.target.previousElementSibling.name !== "carousel-toggle") {
          arr[arr.length - 1].classList.add("slide-show");
          controls[arr.length - 1].classList.add("label-active");
        } else {
          arr[inx - 1].classList.add("slide-show");
          controls[inx - 1].classList.add("label-active");
        }
      });
    }
  });
});
