const STORE_NAME = "user";
import AddPizza from "./AddPizza";
import PrintError from "./PrintError";
import { loadBasicElement } from "../utils/render";
import Navigation from "./Navigation";
import callAPI from "../utils/api";

const COMPONENT_NAME = "Login";
/**
 * @returns {HTMLFormElement} return the login form, with an attached submit event listenner
 */
const Login = (props, parentHtmlElement) => {
  const form = loadBasicElement(
    props,
    parentHtmlElement,
    "form",
    COMPONENT_NAME
  );

  if (props.isUpdated) {
    // in this specific case, clear the form and don't do anything more
    form.reset();
    return;
  }

  const username = document.createElement("input");
  username.type = "text";
  username.id = "username";
  username.required = true;
  const password = document.createElement("input");
  password.type = "password";
  password.id = "password";
  password.required = true;
  const submit = document.createElement("input");
  submit.value = "Login";
  submit.type = "submit";
  form.appendChild(username);
  form.appendChild(password);
  form.appendChild(submit);

  form.addEventListener("submit", onSubmit);
  parentHtmlElement.appendChild(form);
};

const onSubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  console.log("credentials", username.value, password.value);
  try {
    const user = await callAPI("/api/auths/login", "POST", undefined, {
      username: username.value,
      password: password.value,
    }); // json() returns a promise => we wait for the data
    console.log("user authenticated", user);
    // save username and token in the session Storage
    const storageValue = JSON.stringify(user);
    sessionStorage.setItem(STORE_NAME, storageValue);

    // hide the Login button
    const login = document.getElementById("loginBtn");
    login.style.display = "none";
    // show the form to add a pizza
    const page = document.getElementById("page");
    //clear the page
    page.innerHTML = "";
    // add the pizza form to the page
    AddPizza({}, page);
    // update the Navigation
    Navigation({ username: user.username });
  } catch (error) {
    console.error("error:", error);
    PrintError({ innerText: error.toString() }, page);
    form.reset();
  }
};

export default Login;
