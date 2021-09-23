//? Create Variables to access and store DOM Elements
const body = document.querySelector("body");
const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".menu-list");
const menuBtn = document.querySelector(".menu-btn");
const cancelBtn = document.querySelector(".cancel-btn");
const header = document.querySelector(".header");
const allSections = document.querySelectorAll(".section");

//? Create functions for menubtn class manipulation
menuBtn.onclick = () => {
  menu.classList.add("active");
  menuBtn.classList.add("hide");
  body.classList.add("disabledScroll");
};

//? Create functions for concelBtn class manipulation
cancelBtn.onclick = () => {
  menu.classList.remove("active");
  menuBtn.classList.remove("hide");
  body.classList.remove("disabledScroll");
};

// //? Create function to control when scroll event adds and removes the sticky class.
// window.onscroll = () => {
//   this.scrollY > 20
//     ? navbar.classList.add("sticky")
//     : navbar.classList.remove("sticky");
// };

//! Implement Smooth Scroll
//$ Using event delegation to add event listener to all nav__Links.
//? 1. Add event listener to common parent element.
//? 2. Determine what element originated the event.
document
  .querySelector(".nav__links")
  .addEventListener("click", function (event) {
    event.preventDefault();
    //* Determining if the element we are clicking is the correct link class.
    if (event.target.classList.contains("nav__link")) {
      const id = event.target.getAttribute("href");
      const navLocation = document.querySelector(id);
      navLocation.scrollIntoView({ behavior: "smooth" });
    }
  });

//! Implementing Sticky Navigation Using "The Intersection Observer API"
//$ The Intersection Observer API allows code to observe changes to the way a
//$certain target element intersects another element or the way it intersects
//$the viewport.

//* This call back function will get called each time the target element is
//*  intersecting the root element at the threshold we define.

// $ The entries parameter is an array of the thresholds.
const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);
  if (entry.isIntersecting === false) {
    navbar.classList.add("sticky");
  } else {
    navbar.classList.remove("sticky");
  }
};
const navHeight = navbar.getBoundingClientRect().height;
// console.log(navHeight);
const headerObserver = new IntersectionObserver(stickyNav, {
  //* root can be an element, but if you set it to null, the root will be the *viewport.
  root: null,
  //* threshold is the percentage of intersection at which the obsCallBack
  threshold: 0,
  //? Set margin so the threshold is breached 90 pixels before the target.
  rootMargin: `${-navHeight}px`,
});
headerObserver.observe(header);
