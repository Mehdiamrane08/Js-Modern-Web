raiseAlert("This is an alert!");
/**
 * JSDoc as comments
 * @param {message} message to be displayed in console
 */
function raiseAlert(message) {
  // Single line comment
  console.log(message);
  /* Regular comment
    on multiple lines
    */
  console.log("An alert has been raised.");
}

let x = 1;
console.log("x = ", x);

// two different variables
let monBrowser;
let monbrowser;

i = 10;

1 == 1; // true
"1" == 1; // true
0 == false; // true
0 == null; // false
var object1 = { key: "value" },
  object2 = { key: "value" };
object1 == object2; //false

1 === 1; // true
"1" === 1; // false

function welcomeMessage(message) {
  return "Message : " + message;
}
let message = welcomeMessage("Welcome to everyone!");
console.log(message); // Message : Welcome to everyone!

// welcomeMessage() is defined previously
x = welcomeMessage;
message = x("Hi");
console.log(message); // Message : Hi

const welcome = function (message) {
  return "Message : " + message;
};
message = welcome("Hello world ; )");
console.log(message); // Message : Hello world ; )

const welcome2 = (message) => {
  return "Message : " + message;
};
message = welcome2("Hello world...");
console.log(message); // Message : Hello world...
// OTHER EXAMPLE
const higher = (n) => n + 1;
console.log(higher(1)); // 2

let welcome3 = function (message = "HI DEAR HUMAN!") {
  return "Message : " + message;
};
message = welcome3();
console.log(message); // HI DEAR HUMAN

//var varInFunction = "Hello";

if (true) {
  var globalVar = "Hello";
  console.log(globalVar); // Hello
}
console.log(globalVar); // Hello

function checkScopeVarInFunction() {
  varInFunction = "Hello";
  console.log(varInFunction); // Hello
}
checkScopeVarInFunction();
console.log(varInFunction); // Hello

var index = 1;
for (index; index <= 3; index++) {
  console.log(index); // 0 1 2
}
print();
function print() {
  for (index; index <= 5; index++) {
    console.log("Print " + index); // Print 4 Print 5
  }
}

console.log(typeof 12); // number
console.log(typeof "I love JS"); // string
console.log(typeof true); // boolean
console.log(typeof undeclaredVariable); // undefined

let isAuthenticated = false;
if (isAuthenticated) {
  console.log("Render the HomePage.");
  console.log("You are authenticated.");
} else {
  console.log("Render the Login Page."); // Render the Login Page.
  console.log("You are not authenticated."); // You are not authenticated.
}

let foo = 0;
switch (foo) {
  case -1:
    console.log("negative 1");
    break;
  case 0: // foo is 0 so criteria met here so this block will run
    console.log(0);
  // NOTE: the forgotten break would have been here
  case 1: // no break statement in 'case 0:' so this case will run as well
    console.log(1);
    break; // it encounters this break so will not continue into 'case 2:'
  case 2:
    console.log(2);
    break;
  default:
    console.log("default");
}

let myMessage = { content: "Hello" };
consolePrint(myMessage);
function consolePrint(myMessage) {
  console.log(myMessage.content); // Hello
  myMessage.content = "Good bye";
}
console.log(myMessage.content); // Good bye

for (let index = 0; index < 5; index++) {
  console.log(index); // 0 1 2 3 4 5
}

// iterate through object properties
const object = { a: 1, b: 2, c: 3 };
for (const key in object) {
  console.log(key, "(key): ", object[key], "(value)"); // a(key): 1(value) b(key): 2(value) c(key): 3(value)
}

const LIBRARIES = ["Anime.js", "Three.js", "Phaser.io"];
const emptyArray = [];
emptyArray[0] = 0;

const LIBRARIES_NOT_RECOMMENDED = new Array(
  "Anime.js",
  "Three.js",
  "Phaser.io"
);
const emptyArrayNotRecommended = new Array();
const arr = new Array(101); // What is the result ?

for (let index = 0; index < LIBRARIES.length; index++) {
  console.log(LIBRARIES[index]); // Anime.js Three.js Phaser.io
}

LIBRARIES.forEach((item, index) => console.log("[" + index + "]: " + item)); // [0]: Anime.js [1]: Three.js [2]: Phaser.io

LIBRARIES.forEach(function (item) {
  return console.log(item); // Anime.js Three.js Phaser.io
});

// multidimensional arrays
const numberOfRows = 2;
const numberOfColumns = 2;
const myTab = [];
for (let x = 0; x < numberOfRows; x++) {
  myTab[x] = [];
  for (let y = 0; y < numberOfColumns; y++) {
    myTab[x].push("[" + x + "][" + y + "]"); // myTab[x][y] = "[" + x + "][" + y + "]"; not recommended
    console.log(myTab[x][y]);
  }
}

let raphael = {
  firstname: "Raphael",
  lastname: "Baroni",
  sayHello: () => "Hi everyone !",
};

let sandra = {};
sandra.firstname = "Sandra";
sandra.lastname = "Parisi";

console.log(raphael.firstname, " :", raphael.sayHello()); // Raphael  : Hi everyone !
console.log(sandra["firstname"], ",", sandra["lastname"]); // Sandra , Parisi

function divideXByY(x, y) {
  if (y === 0) throw "Division by 0 ! "; // { name: "Division_Exception", message: "Division by 0 ! " };
  return x / y;
}
//divideXByY(5, 0); // Uncaught {name: "Division_Exception", message: "Division par 0 ! "}

try {
  divideXByY(5, 0);
} catch (err) {
  console.log("divideXbyY():Error:", err); // divideXbyY():Error: {name: "Division_Exception", message: "Division by 0 ! "
}

function RegularDivideXByY(x, y) {
  if (y === 0) throw new RangeError("Division by 0 ! ");
  return x / y;
}
try {
  RegularDivideXByY(5, 0);
} catch (err) {
  console.log("RegularDivideXbyY():", err.name, ":", err.message); // RegularDivideXbyY() : RangeError: Division by 0 !
}

let result;
try {
  result = RegularDivideXByY(5, 0);
} catch (err) {
  console.log("RegularDivideXbyY():", err.name, ":", err.message); // RegularDivideXbyY() : RangeError: Division by 0 !
} finally {
  console.log(
    "RegularDivideXbyY() results:",
    result,
    "JS Divion's result",
    5 / 0
  ); // RegularDivideXbyY() results: undefined JS Divion's result Infinity
}

function useStrict() {
  "use strict";
  undeclaredVar = "I am undeclared..."; // Uncaught ReferenceError: undeclaredVar is not defined
  console.log(undeclaredVar);
}
//useStrict();

var timeoutID;

//var myVar = setInterval(myTimer, 1000);

function myTimer() {
  var d = new Date();
  var t = d.toLocaleTimeString();
  document.getElementById("demo").innerHTML = t;
}

function myStopFunction() {
  clearInterval(myVar);
}

console.log("end");

const dateTimeNow = new Date();
let [day, month, year] = dateTimeNow.toLocaleDateString().split("/");
let [hour, minute, second] = dateTimeNow
  .toLocaleTimeString()
  .slice(0, 7)
  .split(":");

console.log(dateTimeNow);

console.log(dateTimeNow.toLocaleDateString()); // e.g. 17/08/2020
console.log(dateTimeNow.toLocaleTimeString()); // e.g. 13:26:15

const animationLibraries = [
  {
    title: "Anime.js",
    url: "https://animejs.com/",
    description: `Anime.js (/ˈæn.ə.meɪ/) is a lightweight JavaScript animation library with a simple, yet powerful API.
It works with CSS properties, SVG, DOM attributes and JavaScript Objects.`,
  },
  {
    title: "Three.js",
    url: "https://threejs.org/",
    description:
      "Three.js is a cross-browser JavaScript library and application programming interface used to create and display animated 3D computer graphics in a web browser using WebGL.",
  },
  {
    title: "Phaser.io",
    url: "https://phaser.io/",
    description:
      "Phaser is a fast, free, and fun open source HTML5 game framework that offers WebGL and Canvas rendering across desktop and mobile web browsers. ",
  },
  {
    title: "GSAP",
    url: "https://greensock.com/gsap/",
    description:
      "GSAP is a JavaScript library for building high-performance animations that work in every major browser. Animate CSS, SVG, canvas, React, Vue, WebGL, colors, strings, motion paths, generic objects... anything JavaScript can touch!",
  },
  {
    title: "Mo.js",
    url: "https://mojs.github.io/",
    description:
      "mo · js is a javascript motion graphics library that is a fast, retina ready, modular and open source. In comparison to other libraries, it have a different syntax and code animation structure approach. The declarative API provides you a complete control over the animation, making it customizable with ease.",
  },
  {
    title: "Velocity.js",
    url: "http://velocityjs.org/",
    description: `Velocity is an animation engine with the same API as jQuery's $.animate(). It works with and without jQuery. It's incredibly fast, and it features color animation, transforms, loops, easings, SVG support, and scrolling. It is the best of jQuery and CSS transitions combined.`,
  },
  {
    title: "AniJS",
    url: "https://anijs.github.io/",
    description: "A Library to Raise your Web Design without Coding",
  },
  {
    title: "vivus",
    url: "https://maxwellito.github.io/vivus/",
    description:
      "Vivus is a lightweight JavaScript class (with no dependencies) that allows you to animate SVGs, giving them the appearence of being drawn. There are a variety of different animations available, as well as the option to create a custom script to draw your SVG in whatever way you like.",
  },
  {
    title: "ScrollReveal",
    url: "https://scrollrevealjs.org/",
    description:
      "ScrollReveal is a JavaScript library for easily animating elements as they enter/leave the viewport. It was designed to be robust and flexible, but hopefully you’ll be surprised below at how easy it is to pick up.",
  },
  {
    title: "Typed.js",
    url: "https://mattboldt.com/demos/typed-js/",
    description:
      "Typed.js is a library that types. Enter in any string, and watch it type at the speed you've set, backspace what it's typed, and begin a new sentence for however many strings you've set.",
  },
];

const librariesCloud = [
  "Anime.js",
  "Three.js",
  "Phaser.io",
  "GSAP",
  "Mo.js",
  "Velocity",
  "...",
];
