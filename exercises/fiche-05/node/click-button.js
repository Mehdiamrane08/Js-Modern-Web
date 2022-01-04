"use strict";
let btn1 = document.getElementById("myBtn1");
let btn2 = document.querySelector("#myBtn2");
let btnArray = document.querySelectorAll("button"); // Nodelist of HTMLButtonElements is returned
let btn3 = btnArray[2];
let btn4 = document.getElementById("myBtn4");

btn1.onclick = function () {
  btn1.innerText = "You clicked on me : )";
  console.log("btn.onclick::anonymous function");
};

function onClickHandlerForBtn2() {
  btn2.innerText = "I have been clicked";
  console.log("onClickHandlerForBtn2::click");
}

function onClickHandlerForBtnExtra() {
  console.log("onClickHandlerForBtnExtra::click");
}

function onClickHandlerForBtn3() {
  btn3.innerText = "I have also been clicked";
  console.log("onClickHandlerForBtn3::click");
}

const onClickHandlerForBtn4 = () => {
  console.log("onClickHandlerForBtn4::click");
  btn3.removeEventListener("click", onClickHandlerForBtnExtra);
};

btn2.addEventListener("change", onClickHandlerForBtn2);
btn3.addEventListener("click", onClickHandlerForBtn3);
btn3.addEventListener("click", onClickHandlerForBtnExtra);
btn4.addEventListener("click", onClickHandlerForBtn4);

console.log("global::variables set");
