import { setLayout } from "../utils/render.js";

let homePage = `<p>Welcome to MyCMS...</p>
`;
let page = document.querySelector("#page");

const HomePage = () => {
  setLayout("Home");
  let page = document.querySelector("#page");
  return (page.innerHTML = homePage);
};

export default HomePage;
