import Icon from "../images/logo_vinci.png";
import { setLayout } from "../utils/render.js";

let page = document.querySelector("#page");

const LoginTempPage = () => {  
  setLayout("Veuillez vous logger pour accéder à cette ressource");
  
  let loginTempPage = `
    <p>Vous pouvez vous logger en cliquant 
    <a href="#" data-uri="/login">
    <img src="${Icon}" alt="" width="24" height="24">ici
    </a> 
    ou dans le menu.</p>
  `; 
  page.innerHTML = loginTempPage;  
};

export default LoginTempPage;
