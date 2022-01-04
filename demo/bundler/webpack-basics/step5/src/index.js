import "./stylesheets/style.css";
import logo from "./img/js-logo.png";
import ListPizzas from "./Components/ListPizzas";
import Header from "./Components/Header";
import Footer from "./Components/Footer";

const header = document.querySelector("header");
Header({ innerHTML: "<h1>We love Pizza</h1>" }, header);

const page = document.querySelector("#page");

// print a list of all pizza into the main section
ListPizzas({}, page);

const footer = document.querySelector("footer");
Footer({ h1: "But we also love JS", src: logo, height: 50 }, footer);

/**
 * import / export modules : Some extra codes to understand how to manage named export or default export within modules
 * ECMAScript import / export (client side)
 *  */

// 1) modern import from named export
/*import { loadBasicElement } from "./utils/render.js";
// Create a component & render it in page div, weird call
const div = loadBasicElement(
  { innerHTML: "<h1> Modern named import</h1>" },
  page,
  "div",
  "ModernImportDiv"
);
page.appendChild(div);*/

// 2) weird import from named export, to explain how the modern import works
/*import * as RenderLibraryWeird from "./utils/render.js";
// Create a component & render it in page div, weird call
const weirdDiv = RenderLibraryWeird.loadBasicElement(
  { innerHTML: "<h1> Weird named import</h1>" },
  page,
  "div",
  "WeirdImportDiv"
);
page.appendChild(weirdDiv);

// destructuring assignment : object destructuring : https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment
let {
  isModification,
  loadBasicElement: loadBasicElementNewName,
  createBasicElement,
} = RenderLibraryWeird;
// this is equivalent of
//let isModification = RenderLibraryWeird.isModification;
//let loadBasicElementNewName = RenderLibraryWeird.loadBasicElement; // we have given a new variable name to loadBasicElement
//let createBasicElement = RenderLibraryWeird.createBasicElement;
// Create a component & render it in page div, weird call
const lessWeirdDiv = loadBasicElementNewName(
  { innerHTML: "<h1> Less Weird named import</h1>" },
  page,
  "div",
  "LessWeirdImportDiv"
);
page.appendChild(lessWeirdDiv);*/

// 3) import from named export :  using a variable directly does not work
/*import RenderLibraryNOK from "./utils/render.js";
if (!RenderLibraryNOK)
  console.log(
    "import from named export using a variable directly : Not working. Variable = ",
    RenderLibraryNOK
  );*/

// 4) import from default export
/*import Login from "./Components/Login.js";
Login({ id: "regularLogin", innerHTML: "<h1>Regular Login<h1>"}, page);*/

// 5) import from default export : change variable name
/*import WeirdLogin from "./Components/Login.js";
WeirdLogin({ id: "weirdLogin", innerHTML: "<h1>Weird Login<h1>" }, page);*/
