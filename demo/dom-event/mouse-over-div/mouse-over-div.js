"use strict";
// dumb function
function welcome() {
  return "Welcome dear students ; )";
}

let msg = document.querySelector(".message");

msg.addEventListener("mouseover", () => {
  console.log("msg::mouseover");
  msg.innerText = welcome();
});

msg.addEventListener("mouseout", function (e) {
  console.log("msg::mouseout: div id :" + e.target.id);
  msg.innerText = "You have left the div tag";
});
