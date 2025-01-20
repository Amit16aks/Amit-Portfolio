'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// skills variables
const skillsItem = document.querySelectorAll("[data-skills-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const skillsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < skillsItem.length; i++) {

  skillsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-skills-avatar]").src;
    modalImg.alt = this.querySelector("[data-skills-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-skills-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-skills-text]").innerHTML;

    skillsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", skillsModalFunc);
overlay.addEventListener("click", skillsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// Select form elements
const form = document.querySelector("#contact-form");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");
const popup = document.querySelector("#form-popup");

// Helper function to validate email
function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
}

// Add event listener to validate input fields on input
formInputs.forEach((input) => {
  input.addEventListener("input", () => {
    // Enable the button if all fields are valid
    if (validateForm()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
});

// Form validation logic
function validateForm() {
  let isValid = true;

  // Check each input
  formInputs.forEach((input) => {
    if (input.type === "email") {
      // Validate email
      if (!isValidEmail(input.value)) {
        isValid = false;
      }
    } else {
      // Ensure other fields are not empty
      if (input.value.trim() === "") {
        isValid = false;
      }
    }
  });

  return isValid;
}

// Handle form submission
function handleFormSubmit(event) {
  event.preventDefault(); // Prevent default submission

  if (!validateForm()) {
    alert("Please fill out all fields correctly.");
    return;
  }

  const formData = new FormData(form);

  // Submit data to Google Forms
  fetch("https://docs.google.com/forms/d/e/1FAIpQLSdCx90OUjrnoXZGJwnLb1IF7UE6bU9tvQh1IQNdvEkRA98iog/formResponse", {
    method: "POST",
    body: formData,
    mode: "no-cors", // Prevent CORS issues
  })
    .then(() => {
      // Show the popup on success
      popup.classList.remove("hidden");
    })
    .catch((error) => {
      console.error("Submission error:", error);
      alert("Something went wrong. Please try again.");
    });

  // Reset the form
  form.reset();
  formBtn.setAttribute("disabled", ""); // Disable the button again
}

// Close the popup
function closePopup() {
  popup.classList.add("hidden");
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}