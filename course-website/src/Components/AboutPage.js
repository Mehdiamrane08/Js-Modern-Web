import { setLayout } from "../utils/render.js";
let page = document.querySelector("#page");

const AboutPage = () => {  
  setLayout("Bienvenue sur le site du cours de JS et de Node.js.");  
  let aboutPage = `
  <p class="mt-4">Le but de ce cours est :
  <ul>
    <li>d’apprendre et de mettre en œuvre des technologies et des techniques modernes de développement d'applications web ;</li>
    <li>de découvrir comment son code peut être structuré, débuggé ;</li>
    <li>de voir et intervenir dans différents types d’architectures web classiques : Multi Page Application (MPA), Single Page Application (SPA) monolithique, SPA dont le frontend est indépendant du backend (RESTful API)…</li>
    <li>de s’initier au développement d’animations ;</li>
    <li>de créer des web APIs ;</li>
    <li>d’obtenir les compétences pour développer un projet qui vous tient à cœur !</li>
  </ul>
  </p>
  <p>Si vous souhaitez participer à la mise à jour du cours, n’hésitez pas à faire part de modifications 
  via des Issues ou des Merge Requests via le web repository du cours : 
  <a href="https://gitlab.vinci.be/web2/js-modern-web-development.git" target="_blank">
    Modern web development with JS and Node Repository
  </a>
  <br><br>
  Nous espérons que vous apprendrez en vous amusant !</p>
  <p class="text-info">e-Baron</p>
  `; 
  page.innerHTML = aboutPage;  
};

export default AboutPage;
