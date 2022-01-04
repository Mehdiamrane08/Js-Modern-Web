const STORE_NAME = "user";
import AddPizza from "./AddPizza";

/**
 * @returns {HTMLFormElement} return the login form, with an attached submit event listenner
 */
const Login = () => {
  const form = document.createElement("form");
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
  return form;
};

const onSubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("username");
  const password = document.getElementById("password");
  console.log("credentials", username.value, password.value);
  try {
    const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        username: username.value,
        password: password.value,
      }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/api/auths/login", options); // fetch return a promise => we wait for the response

    if (!response.ok) {
      // status code was not 200, error status code
      const error = await response.text(); // get the textual error message
      throw new Error(error);
    }
    const user = await response.json(); // json() returns a promise => we wait for the data
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
    page.appendChild(AddPizza());  
    
  } catch (error) {
    console.error("error:", error);
  }
};

export default Login;
