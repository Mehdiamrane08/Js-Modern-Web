/* In a template literal, the ` (backtick), \ (backslash), and $ (dollar sign) characters should be 
escaped using the escape character \ if they are to be included in their template value. 
By default, all escape sequences in a template literal are ignored.*/
let loginPage = `<form>
<div class="form-group">
  <label for="email">Email</label>
  <input class="form-control" id="email" type="text" name="email" placeholder="Enter your email" required="" pattern="^\\w+([.-]?\\w+)*@\\w+([\.-]?\\w+)*(\\.\\w{2,4})+\$" />
</div>
<div class="form-group">
  <label for="password">Password</label>
  <input class="form-control" id="password" type="password" name="password" placeholder="Enter your password" required="" pattern=".*[A-Z]+.*" />
</div>
<button class="btn btn-primary" id="btn" type="submit">Submit</button>
<!-- Create an alert component with bootstrap that is not displayed by default-->
<div class="alert alert-danger mt-2 d-none" id="messageBoard"></div>
</form>`;

const LoginPage = () => {
  let page = document.querySelector("#page");
  page.innerHTML = loginPage;
  let loginForm = document.querySelector("form");
  loginForm.addEventListener("submit", onLogin);
};

const onLogin = (e) => {
  e.preventDefault();
  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let user = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  console.log("onLogin:before async call");
  asyncLogin(user).then(onUserLogin).catch(onError);
  //asyncLogin2(user).then(onUserLogin).catch(onError);
  console.log("onLogin:end");
};

import { RedirectUrl } from "./Router.js";
import Navbar from "./Navbar.js";

const onUserLogin = (userData) => {
  console.log("onUserLogin:", userData);
  // re-render the navbar for the authenticated user
  Navbar(userData);
  RedirectUrl("/list");
};

const onError = (err) => {
  let messageBoard = document.querySelector("#messageBoard");
  let errorMessage = "";
  if (err.message.includes("401")) errorMessage = "Wrong username or password.";
  else errorMessage = err.message;
  messageBoard.innerText = errorMessage;
  // show the messageBoard div (add relevant Bootstrap class)
  messageBoard.classList.add("d-block");
};

// function that return a promise
const asyncLogin = (user) => {
  return new Promise((resolve, reject) => {
    fetch("/api/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(user), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok)
          throw new Error(
            "Error code : " + response.status + " : " + response.statusText
          );
        return response.json();
      })
      .then((data) => {
        console.log("asyncLogin:end of fetch()", "user:", user);
        resolve(data);
      })
      .catch((err) => reject(err));
  });
};

// same function that returns a promise through the use of async / await
const asyncLogin2 = async (user) => {
  try {
    let response = await fetch("/api/users/login", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify(user), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(
        "Error code : " + response.status + " : " + response.statusText
      );
    let data = await response.json();
    console.log("asyncLogin2:end of fetch()", "user:", user);
    return data;
  } catch (err) {
    return err;
  }
};

export default LoginPage;
