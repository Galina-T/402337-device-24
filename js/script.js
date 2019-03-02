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

writeBtn.addEventListener("click", function (evt) {
  evt.preventDefault();
  writePopup.classList.add("modal-show");
  if (storage) {
    login.value = storage;
    if (email.setActive) {
      email.setActive();
    } else {
      email.focus();
    }
  } else {
    if (login.setActive) {
      login.setActive();
    } else {
      login.focus();
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

function checkValide (el) {
  if (el.value) {
    return;
  }
  el.classList.add("invalid-input");
}

function removeInvalide (el) {
  el.classList.remove("invalid-input");
}

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

var carouselControls = document.querySelector(".carousel-controls");
var controls = carouselControls.children;
var slides = document.querySelector(".carousel-slides-list").children;

document.getElementById('slide-1').checked = false;
slides[0].classList.add("slide-show");
controls[0].classList.add("label-active");

carouselControls.addEventListener("click", function (evt) {
  evt.preventDefault();

  if (evt.target === carouselControls || evt.target.classList.contains("label-active")) {
    return;
  }

  var forLable = evt.srcElement.htmlFor;
  var idSlide = 'carousel-' + forLable;

  Array.prototype.forEach.call(slides, function (element, inx) {

    if (element.id === idSlide) {
      document.getElementById(forLable).checked = false;
      element.classList.add("slide-show");
      evt.target.classList.add("label-active");
    } else {
      element.classList.remove("slide-show");
      controls[inx].classList.remove("label-active");
    }
  });
});
