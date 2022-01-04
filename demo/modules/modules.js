"use strict";
// import default export (you could give the name you want)
import Car from "./Components/Car.js";
// import named export
import {setLayout} from "./utils/render.js";

const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE =
  "Demo : ES6 Modules";
const FOOTER_TEXT = "Happy learning : )";
setLayout(HEADER_TITLE, PAGE_TITLE, FOOTER_TEXT);

let btn = document.querySelector("#btn");
let page = document.querySelector("#page");

let raphael = {
  firstname: "Raphael",
  lastname: "Baroni",
  sayHello: () => "Hi everyone !",
};

let sandra = {};
sandra.firstname = "Sandra";
sandra.lastname = "Parisi";



let dacia = new Car("Dacia", "Sandero");

btn.addEventListener("click", function () {
  console.log("click::sayHello(): ", raphael.firstname, " :" , raphael.sayHello());

  console.log("click: get object properties: ",
    sandra.firstname,
    sandra.lastname,
    sandra["firstname"],
    sandra["lastname"]
  );

  page.innerText = dacia.getDescription();
});


