import "./stylesheets/style.css";
import logo from "./img/js-logo.png";
import music from "./sound/Infecticide-11-Pizza-Spinoza.mp3";
import Login from "./Components/Login";

// Manage events on Home & Login buttons
const homeBtn = document.getElementById("homeBtn");
const loginBtn = document.getElementById("loginBtn");
homeBtn.addEventListener("click", onHomeClick);
loginBtn.addEventListener("click", onLoginClick);

function onHomeClick() {
  // call the asynchrone function to print the list of pizzas only if needed
  console.log("home click");
  const page = document.getElementById("page");
  //clear the page
  page.innerHTML = "";
  printPizzas();
}

function onLoginClick() {
  // change the page
  const page = document.getElementById("page");
  // clear the page
  page.innerHTML = "";
  // call a function to get an HTMLForm username / password in the #page div
  page.appendChild(Login());
}

const stopStartSound = () => {
  const myAudioPlayer = document.querySelector("#audioPlayer");

  if (myAudioPlayer.paused) myAudioPlayer.play();
  else myAudioPlayer.pause();
};

const header = document.querySelector("header");
header.addEventListener("click", stopStartSound);

// Create the audio and load the file via webpack file-loader
const myPlayer = `<audio id="audioPlayer" controls autoplay>
        <source
          src="${music}"
          type="audio/mpeg"
        />
        Your browser does not support the audio element.
      </audio>`;

const main = document.querySelector("main");
main.innerHTML += myPlayer;

// the Webpack file-loader recognise /src/img/js-logo.png as local file and replace
//"./image/js-logo.png" with the final path to the image in the output directory (/dist)
const footerPhoto = new Image();
footerPhoto.src = logo;
footerPhoto.src = logo;
footerPhoto.height = 50;
const footer = document.querySelector("footer");
footer.appendChild(footerPhoto);

// load an analog clock
import { AnalogClock } from "customizable-analog-clock";
// const { AnalogClock } = require ("customizable-analog-clock"); // Node syntax require() would also work

main.innerHTML += `  <br><br><div 
                          id="my-clock"                          
                          style="width: 200px; height: 200px;"                         
                      </div>`;
const clock = new AnalogClock({
  htmlElement: "my-clock",
  showIndicators: true,
});

// add the #page div within the main
const pageDiv = document.createElement("div");
pageDiv.id = "page";
main.appendChild(pageDiv);

// print a list of all pizza into the main section
// a) fetch the data from the RESTFul API (unprotected operation)
// if we want to use async / await, we have to do it inside a function
const printPizzas = async () => {
  try {
    // hide data to inform if the pizza menu is already printed
    const pageDiv = document.getElementById("page")    
    pageDiv.classList.add("menuList");
    // only print the pizza menu if it is not already done
    const response = await fetch("/api/pizzas"); // fetch return a promise => we wait for the response

    if (!response.ok) {
      // status code was not 200, error status code
      const error = await response.text(); // get the textual error message
      throw new Error(error);
    }
    const pizzas = await response.json(); // json() returns a promise => we wait for the data
    // create an HTMLTableElement dynamically, based on the pizzas data (Array of Objects)
    const table = document.createElement("table");
    // deal with header
    const header = document.createElement("tr");
    const header1 = document.createElement("th");
    header1.innerText = "Pizza";
    const header2 = document.createElement("th");
    header2.innerText = "Description";
    header.appendChild(header1);
    header.appendChild(header2);
    table.appendChild(header);
    // deal with data rows
    pizzas.forEach((pizza) => {
      const line = document.createElement("tr");
      const titleCell = document.createElement("td");
      titleCell.innerText = pizza.title;
      line.appendChild(titleCell);
      const descriptionCell = document.createElement("tr");
      descriptionCell.innerText = pizza.content;
      line.appendChild(descriptionCell);
      // hide info within each row, the pizza id
      line.dataset.pizzaId = pizza.id;
      table.appendChild(line);
    });
    // add the HTMLTableElement to the main, within the #page div
    pageDiv.appendChild(table);
  } catch (error) {
    console.error("error:", error);
  }
};

// call the asynchrone function to print the list of pizzas
printPizzas();
