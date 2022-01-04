import { setLayout } from "../utils/render.js";
let page = document.querySelector("#page");

const HomePage = () => {  
  setLayout("Login");  
  let homePage = `Bienvenue sur le site du cours de JS.`; 
  page.innerHTML = homePage;  
};

export default HomePage;
