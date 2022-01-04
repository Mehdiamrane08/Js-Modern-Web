import Quote from "./Quote.js";
import {RedirectUrl} from "./Router.js";

let page = document.querySelector("#page");

const HomePage = () => {    
  page.innerHTML = `<div id="quote"></div>`;
  Quote(); 
};

export default HomePage;
