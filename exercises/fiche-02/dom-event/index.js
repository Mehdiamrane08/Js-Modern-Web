"use strict";

const MESSAGES = [
  "Bravo, bel échauffement !",
  "Vous êtes passé maître en l’art du clic !",
];

let counter = 0;
let counterDiv = document.querySelector("#counter");
let messageDiv = document.querySelector("#message");
// init counter & message div
counterDiv.textContent = counter;

const onWindowClick = (e) => {
  counterDiv.textContent = ++counter;
  counterDiv.textContent = counter;
  if (counter === 5) messageDiv.textContent = MESSAGES[0];
  else if (counter === 10) messageDiv.textContent = MESSAGES[1];
};

window.addEventListener("click", onWindowClick);

counterDiv.addEventListener("click", (e) => {
  e.stopPropagation();
  alert("Unauthorized click on the counter!");
});
