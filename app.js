// //? Create Variables to access and store DOM Elements
// const body = document.querySelector("body");
// const nav = document.querySelector(".nav");
// const menu = document.querySelector(".menu-list");
// const menuBtn = document.querySelector(".menu-btn");
// const cancelBtn = document.querySelector(".cancel-btn");
// const header = document.querySelector(".header");
// const allSections = document.querySelectorAll(".section");

// // //? Create functions for menubtn class manipulation
// // menuBtn.onclick = () => {
// //   menu.classList.add("active");
// //   menuBtn.classList.add("hide");
// //   body.classList.add("disabledScroll");
// // };

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

// // //? Create functions for concelBtn class manipulation
// // cancelBtn.onclick = () => {
// //   menu.classList.remove("active");
// //   menuBtn.classList.remove("hide");
// //   body.classList.remove("disabledScroll");
// // };

// // //? Create function to control when scroll event adds and removes the sticky class.
// // window.onscroll = () => {
// //   this.scrollY > 20
// //     ? navbar.classList.add("sticky")
// //     : navbar.classList.remove("sticky");
// // };

// //! Implement Smooth Scroll
// //$ Using event delegation to add event listener to all nav__Links.
// //? 1. Add event listener to common parent element.
// //? 2. Determine what element originated the event.
// document
//   .querySelector(".nav__links")
//   .addEventListener("click", function (event) {
//     event.preventDefault();
//     //* Determining if the element we are clicking is the correct link class.
//     if (event.target.classList.contains("nav__link")) {
//       const id = event.target.getAttribute("href");
//       const navLocation = document.querySelector(id);
//       navLocation.scrollIntoView({ behavior: "smooth" });
//     }
//   });

// //! Menu Fade Animation...

// //? Selecting the nav link because it is the parent link to all the elements in
// //?the nav bar.
// const handleHover = function (event) {
//   if (event.target.classList.contains("nav__link")) {
//     //? Define the elements we will be working with.
//     const link = event.target;
//     const siblings = link.closest(".nav").querySelectorAll(".nav__link");
//     const logo = link.closest(".nav").querySelector("img");

//     //? Loop through the nav__link elements and if they don't equal the one that
//     //? is being hovered over, then their opacity is set to 0.5.
//     siblings.forEach((el) => {
//       if (el !== link) {
//         el.style.opacity = this;
//       }
//     });
//     //? Setting the logo's opacity to 0.5 when a nav link is hovered over.
//     logo.style.opacity = this;
//   }
// };

// nav.addEventListener("mouseover", handleHover.bind(0.5));

// nav.addEventListener("mouseout", handleHover.bind(1));

// //! Implementing Sticky Navigation Using "The Intersection Observer API"
// //$ The Intersection Observer API allows code to observe changes to the way a
// //$certain target element intersects another element or the way it intersects
// //$the viewport.

// //* This call back function will get called each time the target element is
// //*  intersecting the root element at the threshold we define.

// // $ The entries parameter is an array of the thresholds.
// const stickyNav = function (entries) {
//   const [entry] = entries;
//   // console.log(entry);
//   if (entry.isIntersecting === false) {
//     nav.classList.add("sticky");
//   } else {
//     nav.classList.remove("sticky");
//   }
// };
// const navHeight = nav.getBoundingClientRect().height;
// // console.log(navHeight);
// const headerObserver = new IntersectionObserver(stickyNav, {
//   //* root can be an element, but if you set it to null, the root will be the *viewport.
//   root: null,
//   //* threshold is the percentage of intersection at which the obsCallBack
//   threshold: 1,
//   //? Set margin so the threshold is breached before the target.
//   rootMargin: `${-navHeight}px`,
// });
// headerObserver.observe(header);

//! Building a Slider Component
//TODO: Remove the slider styling that is being used to see the elements.
// //? Reduce the size of the slider view size
// slider.style.transform = "scale(0.5)";
// //? Set overflow style property to visible to see more slides.
// slider.style.overflow = "visible";

//? Loop through the slides and set the style on each of them.
//* Multiplying the index by 100 to set where the item will be positioned.
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i}%)`));
const sliderFunction = function () {
  //# Slider Variables ------------------------------------
  let curSlide = 0;
  const maxSlide = slides.length;

  //# Slider Functions -------------------------------------
  //? Create a function to create the slider dots.
  const createDots = function () {
    slides.forEach(function (_, i) {
      dotContainer.insertAdjacentHTML(
        "beforeend",
        `<button class="dots__dot" data-slide="${i}"></button>`
      );
    });
  };

  //? Create a function that will change the "Active" dot in the slider dots.
  const activateDot = function (slide) {
    //* First deactivate all the dots.
    document
      .querySelectorAll(".dots__dot")
      .forEach((dot) => dot.classList.remove("dots__dot--active"));

    document
      .querySelector(`.dots__dot[data-slide="${slide}"]`)
      .classList.add("dots__dot--active");
  };

  //? Function to loop through the slides and update there style to adjust their
  //? position.
  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * (i - slide)}%)`)
    );
  };

  //? Creat a function to move the slides to the right.
  const nextSlide = function () {
    if (curSlide === maxSlide - 1) {
      curSlide = 0;
    } else {
      curSlide++;
    }

    goToSlide(curSlide);
    // console.log(curSlide);
    activateDot(curSlide);
  };

  //? Creat a function to move the slides to the left.
  const prevSlide = function () {
    if (curSlide <= 0) {
      curSlide = maxSlide - 1;
    } else {
      curSlide--;
    }

    goToSlide(curSlide);
    // console.log(curSlide);
    activateDot(curSlide);
  };

  const init = function () {
    //$ Running goToSlide(0) to load the page on the first slide.
    goToSlide(0);
    //$ Running createDots() to create the slider dots when the page is loaded.
    createDots();
    //$ Running activateDot(0) to show active slide dot when the page is loaded.
    activateDot(0);
  };
  init();

  //# Event Listeners -------------------------------------------
  //? Add event listeners to the right and left buttons to select slide position.
  btnRight.addEventListener("click", nextSlide);
  btnLeft.addEventListener("click", prevSlide);

  //? Add a keyboard event to move through the slides.
  document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") prevSlide();
    if (e.key === "ArrowRight") nextSlide();
  });

  //? Add event listener to the dots using event delegation.
  //* dotContainer is the parent element for all of the dots.
  dotContainer.addEventListener("click", function (e) {
    if (e.target.classList.contains("dots__dot")) {
      // console.log(e.target);
      const { slide } = e.target.dataset;
      // console.log(slide);
      goToSlide(slide);
      activateDot(slide);
    }
  });
};
sliderFunction();
