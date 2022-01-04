// webpack asset management to load a picture
import Icon from "../images/logo_vinci.png";
import { getUserName } from "../utils/auths/authPopup";
let navBar = document.querySelector("#navBar");

// destructuring assignment
const Navbar = () => {
  let navbar;

  if (!getUserName()) {
    // unauthenticated user
    navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
  <a class="navbar-brand" href="/" data-uri="/">myJScourse</a
  ><button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNavAltMarkup"
    aria-controls="navbarNavAltMarkup"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">      
      <a class="nav-item nav-link" href="#" data-uri="/contenu">Contenu</a>
      <a class="nav-item nav-link" href="#" data-uri="/about">About</a>
      <a class="nav-item nav-link" href="#" data-uri="/publicprojects">Vitrine de projets</a>
      <a class="nav-item nav-link" href="#" data-uri="/login"><img src="${Icon}" alt="" width="24" height="24">Login Vinci Only</a>
    </div>
  </div>
  </nav>`;
  }
  else{
    // authenticated user
    // If the project group status is 

    navbar = `<nav class="navbar navbar-expand-lg navbar-light bg-light mb-2" id="navBar">
  <a class="navbar-brand" href="/" data-uri="/">myJScourse</a
  ><button
    class="navbar-toggler"
    type="button"
    data-toggle="collapse"
    data-target="#navbarNavAltMarkup"
    aria-controls="navbarNavAltMarkup"
    aria-expanded="false"
    aria-label="Toggle navigation"
  >
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
    <div class="navbar-nav">      
      <a class="nav-item nav-link" href="#" data-uri="/contenu">Contenu</a>
      <a class="nav-item nav-link" href="#" data-uri="/about">About</a>
      <a class="nav-item nav-link" href="#" data-uri="/publicprojects">Vitrine de projets</a>
      <a class="nav-item nav-link" href="#" data-uri="/projects">Projets</a>
      <div class="nav-item dropdown">
        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Revues de projets
        </a>
        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
          <a class="dropdown-item" href="#" data-uri="/my-reviews">Mes revues</a>
          <a class="dropdown-item" href="#" data-uri="/all-reviews">Résultats des revues</a>          
        </div>
      </div>      
      <a class="nav-item nav-link" href="#" data-uri="/logout">Logout</a>
    </div>
  </div>
  </nav>`;

  }

   navBar.innerHTML = navbar;
};

export default Navbar;
