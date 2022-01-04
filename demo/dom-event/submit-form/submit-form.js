const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE = "Demo : form validation following a submit event";
const FOOTER_TEXT = "Happy learning : )";

let msgBoard = document.getElementById("messageBoard");
let myForm = document.querySelector("form");
let errorMessage = document.querySelector("#errorMessage");

// callback to be called when a form is submitted
const onSubmit = (e) => {
  console.log("onSubmit::");
  // Prevent the default behaviour of a form (data sent to URL specified in action parameter)
  e.preventDefault();
  // Start by removing any existing error message
  errorMessage.innerHTML = "";
  msgBoard.classList.remove("d-block");

  if (myForm.elements.email.value == "") {
    showHtmlErrorMessage("No email");
  } else if (
    /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(
      myForm.elements.email.value
    ) === false
  ) {
    showHtmlErrorMessage("Email format invalid");
  }

  if (/.*[A-Z]+.*/.test(myForm.elements.password.value) === false) {
    showHtmlErrorMessage("Password format invalid");
  }
};

function showHtmlErrorMessage(message) {
  if (errorMessage.innerHTML == "") errorMessage.innerHTML = "<p>Error(s):</p>";
  errorMessage.innerHTML += "<p>- " + message + "</p>";

  msgBoard.classList.add("d-block");
}

myForm.addEventListener("submit", onSubmit);

setLayout(HEADER_TITLE, PAGE_TITLE, FOOTER_TEXT);

/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {headerTitle} headerTitle
 * @param {pageTitle} pageTitle
 * @param {footerText} footerText
 */
function setLayout(headerTitle, pageTitle, footerText) {
  document.querySelector("#headerTitle").innerText = headerTitle;
  document.querySelector("title").innerText = pageTitle;
  document.querySelector("#pageTitle").innerText = pageTitle;
  document.querySelector("#footerText").innerText = footerText;
}
