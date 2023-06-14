// Identifing the main variables
const navbar = document.querySelector("nav"),
  btnNavbar = document.querySelector("nav .btn-navbar"),
  navMenu = document.querySelector("nav ul"),
  logo = document.querySelector(".logo"),
  btnContact = document.querySelectorAll(".btn-contact"),
  links = document.querySelectorAll("nav ul li"),
  main = document.querySelector("main"),
  sections = document.querySelectorAll("section"),
  graphs = document.querySelectorAll(".graph"),
  contactForm = document.getElementById("contact-form"),
  formSpinner = document.querySelector(".contact .container form .spinner");

// pushing the main and sections in one array
let mainAndSections = new Array();
mainAndSections.push(main);
sections.forEach((v) => {
  mainAndSections.push(v);
});

// functions starts while window scroll
window.onscroll = () => {
  // Changing navbar style on scrolling
  if (window.pageYOffset < 50) {
    navbar.classList.remove("sticky");
    navbar.style.top = "-100%";
    setTimeout(function () {
      navbar.style.top = "0";
    }, 500);
  } else {
    navbar.classList.add("sticky");
  }

  // Adding active section to the links while scrolling
  mainAndSections.forEach((v, i) => {
    const sectionHeight = v.offsetHeight,
      sectionTop = v.offsetTop;

    if (scrollY > sectionTop - 5 && scrollY <= sectionTop - 5 + sectionHeight) {
      addActiveClass(i);
    }
  });
};

// showing and hidding the menu
btnNavbar.addEventListener("click", () => {
  navMenu.classList.toggle("active");
  btnNavbar.classList.toggle("active");
});

// Scrolling to the home on pressing in Logo
logo.addEventListener("click", (e) => {
  e.preventDefault();
  document
    .querySelector("." + logo.getAttribute("data-link"))
    .scrollIntoView({ behavior: "smooth", block: "start" });
  addActiveClass(0);
});

// Scrolling to contact while pressing in contact button
btnContact.forEach((v) => {
  v.addEventListener("click", () => {
    document
      .querySelector("." + v.getAttribute("data-link"))
      .scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// Smooth scroll setings
document.querySelectorAll("nav ul li").forEach((v) => {
  v.addEventListener("click", (e) => {
    e.preventDefault();
    const el = document.querySelector("." + v.getAttribute("data-link"));
    if (navMenu.classList.contains("active")) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      navMenu.classList.remove("active");
      btnNavbar.classList.toggle("active");
    } else {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// Adding active class to the pressed link
links.forEach((v, i) => {
  v.addEventListener("click", () => {
    addActiveClass(i);
  });
});

// Adding active class function
function addActiveClass(index) {
  for (let j = 0; j < links.length; j++) {
    if (j != index) {
      links[j].querySelector("a").classList.remove("active");
    } else {
      links[j].querySelector("a").classList.add("active");
    }
  }
}

// ------------------- Handle the projects toggling --------------------------
// Get the category buttons and project items
const categoryBtns = document.querySelectorAll(".category-btn");
const projects = document.querySelectorAll(".project");

// Add click event listener to each category button
categoryBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all category buttons
    categoryBtns.forEach((btn) => {
      btn.classList.remove("active");
    });
    // Add active class to clicked category button
    btn.classList.add("active");
    // Get the selected category
    const selectedCategory = btn.dataset.category;
    // Get the current project positions
    const projectPositions = [];
    projects.forEach((project) => {
      projectPositions.push(project.getBoundingClientRect());
    });
    // Filter the projects based on the selected category
    projects.forEach((project, index) => {
      if (
        selectedCategory === "all" ||
        project.dataset.category.includes(selectedCategory)
      ) {
        // Move the project to its new position
        const newPosition = project.getBoundingClientRect();
        const deltaX = projectPositions[index].left - newPosition.left;
        const deltaY = projectPositions[index].top - newPosition.top;
        project.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        project.style.opacity = 0;
        // Wait for the project to move to its new position
        setTimeout(() => {
          project.style.display = "block";
          project.style.transform = "none";
          project.style.opacity = 1;
        }, 500);
      } else {
        // Move the project to its new position
        const newPosition = projectPositions[index];
        const deltaX = projectPositions[index].left - newPosition.left;
        const deltaY = projectPositions[index].top - newPosition.top;
        project.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        project.style.opacity = 0;
        // Wait for the project to move to its new position
        setTimeout(() => {
          project.style.display = "none";
          project.style.transform = "none";
        }, 500);
      }
    });
  });
});

// Adding percentages to the skills
graphs.forEach((graph) => {
  graph.querySelector(".color").style.width = graph.dataset.percent;
});

/* ------------------- Contact us ------------------------ */
// contact us form validation
const formFields = new Array(
  ...document.querySelectorAll(".contact .container form .form-control input"),
  document.querySelector(".contact .container form .form-control textarea")
);
const errorMessages = document.querySelectorAll(
  ".contact .container form .form-control .error-message"
);
const btnSubmit = document.getElementById("submit-contact");

const formData = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

function checkInput(input, index) {
  const fieldName = input.id.includes("-")
    ? input.id.replace("-", "")
    : input.id;
  const value = input.value;
  const email = input.type === "email";
  const phone = input.type === "tel";
  const minLength = Number(input.dataset.minlength);
  const maxLength = Number(input.dataset.maxlength);

  if (value) {
    errorMessages[index].textContent = "";
    if (email) {
      if (!validateEmail(value)) {
        errorMessages[index].textContent = "Email isn't valid";
        formData[fieldName] = "";
      } else {
        formData[fieldName] = value;
      }
    } else if (phone) {
      if (!validatePhoneNumber(value)) {
        errorMessages[index].textContent = "Phone number isn't valid";
        formData[fieldName] = "";
      } else {
        formData[fieldName] = value;
      }
    } else if (value.length < minLength) {
      errorMessages[
        index
      ].textContent = `${fieldName} must be ${minLength} charaters at least`;
      formData[fieldName] = "";
    } else if (value.length > maxLength) {
      errorMessages[
        index
      ].textContent = `${fieldName} must be ${maxLength} caracters by maximum`;
      formData[fieldName] = "";
    } else {
      formData[fieldName] = value;
    }
  } else {
    formData[fieldName] = "";
    errorMessages[index].textContent = "This field is required";
  }
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
    );
}

function validatePhoneNumber(number) {
  return String(number).match(/^01[0-2,5]{1}[0-9]{8}$/);
}

formFields.forEach((field, i) => {
  field.addEventListener("keyup", () => {
    checkInput(field, i);
    validateSubmition();
  });
});

function validateSubmition() {
  for (let [k, v] of Object.entries(formData)) {
    if (!v) {
      btnSubmit.disabled = true;
      break;
    } else {
      btnSubmit.disabled = false;
    }
  }
}

// Sending contact form at the email
function sendEmail() {
  const serviceID = "service_xlarc6w";
  const templateID = "template_0unmxhj";
  const publicKey = "7yTVbtoo_U6NFwH6c";
  const params = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("message").value,
  };

  emailjs
    .send(serviceID, templateID, params, publicKey)
    .then((res) => {
      contactForm.reset();
      alert(`Your message sent succefully 😍`);
    })
    .catch((err) => {
      contactForm.reset();
      alert(`error code: ${err.status} ${err.text}`);
    });
}

contactForm.addEventListener("submit", (e) => {
  e.preventDefault();
  for (const k in formData) {
    formData[k] = "";
  }
  validateSubmition();
  sendEmail();
});

// ------------ Starting typed function ---------------
let typed = new Typed(".typed", {
  strings: ["Developer", "Freelancer"],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
});

let typed2 = new Typed(".typed2", {
  strings: ["Developer", "Freelancer"],
  typeSpeed: 50,
  backSpeed: 50,
  loop: true,
});
