import { loadBasicElement } from "../utils/render";
import ListPizzas from "./ListPizzas";
import Login from "./Login";
/**
 * @param {*} props
 * @param {*} parentHtmlElement
 */
const COMPONENT_NAME = "Navigation";

const Navigation = (props, parentHtmlElement) => {
  // deals with loading either a new element
  // or the updated element based on the generic props (HTML attributes)
  const divNav = loadBasicElement(
    props,
    parentHtmlElement,
    "div",
    COMPONENT_NAME
  );

  if (props.isUpdated) {
    // if a username is received, the navigation shall show it's authenticated state
    let { username } = props;
    if (username) {
      // hide the Login button
      const login = document.getElementById("loginBtn");
      login.style.display = "none";
      
    }
    // show the unauthenticated state of navigation
    else {
      // display the Login button
      const login = document.getElementById("loginBtn");
      login.style.display = "block";
    }
    return;
  }

  //Render Home & Login buttons
  const homeBtn = document.createElement("button");
  homeBtn.id = "homeBtn";
  homeBtn.innerText = "Home";
  const loginBtn = document.createElement("button");
  loginBtn.id = "loginBtn";
  loginBtn.innerText = "Login";
  divNav.appendChild(homeBtn);
  divNav.appendChild(loginBtn);

  // Manage events on Home & Login buttons
  homeBtn.addEventListener("click", onHomeClick);
  loginBtn.addEventListener("click", onLoginClick);

  parentHtmlElement.appendChild(divNav);
};

function onHomeClick() {
  // call the asynchrone function to print the list of pizzas only if needed
  console.log("home click");
  const page = document.getElementById("page");
  //clear the page
  page.innerHTML = "";
  ListPizzas({}, page);
}

function onLoginClick() {
  // change the page
  const page = document.getElementById("page");
  // clear the page
  page.innerHTML = "";
  // call a function to get an HTMLForm username / password in the #page div
  Login({}, page);
}

export default Navigation;
