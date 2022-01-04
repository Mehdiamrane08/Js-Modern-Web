"use strict";
const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE = "Demo : Oriented Object Programming in JS";
const FOOTER_TEXT = "Happy learning : )";

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

class Car {
  constructor(brand, model) {
    this.brand = brand;
    this.model = model;
    this._id = Math.random();
  }
  get id() {
    return this._id;
  }
  getDescription() {
    return (
      "Car's description : " +
      this.brand +
      ", " +
      this.model +
      " , ID:" +
      this.id
    );
  }
}

let dacia = new Car("Dacia", "Sandero");

btn.addEventListener("click", function () {
  console.log(
    "click::sayHello(): ",
    raphael.firstname,
    " :",
    raphael.sayHello()
  );

  console.log(
    "click: get object properties: ",
    sandra.firstname,
    sandra.lastname,
    sandra["firstname"],
    sandra["lastname"]
  );

  page.innerText = dacia.getDescription();
});

function Auto(brand, model) {
  this.brand = brand;
  this.model = model;
  this.id = Math.random();
}

Auto.prototype.getDescription = function () {
  return (
    "Car's description : " + this.brand + ", " + this.model + " , ID:" + this.id
  );
};

let audi = new Auto("Audi", "A4");
console.log(audi.getDescription());

function AutoNotRecommended(brand, model) {
  let obj = {};
  obj.brand = brand;
  obj.model = model;
  obj.id = Math.random();
  obj.getDescription = function () {
    return (
      "Car's description : " + this.brand + ", " + this.model + " , ID:" + this.id
    );
  };
  return obj;
}
let lada = AutoNotRecommended("Lada", "XRAY");
// let lada = new AutoNotRecommended("Lada", "XRAY"); // also works

console.log(lada.getDescription());

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
