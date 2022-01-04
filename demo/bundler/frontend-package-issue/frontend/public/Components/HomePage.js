const movieQuote = require("popular-movie-quotes");

let homePage = `<p>Welcome to MyCMS...</p>
`;
let page = document.querySelector("#page");
let timer;

const HomePage = async () => {
  console.log("HomePage: start");
  let page = document.querySelector("#page");
  page.innerHTML = homePage;
  let messageBoard = document.querySelector("p");
  /* simulate the call to the API */
  try {
    messageBoard.innerHTML = `<p>${movieQuote.getRandomQuote()}</p>`;
  } catch (err) {
    console.error("HomePage::err:", err);
    messageBoard.innerHTML = err + `<p>${movieQuote.getRandomQuote()}</p>`;
  }
  console.log("HomePage: end");
  window.addEventListener("click", onWindowClick);
};

const onWindowClick = () => {
  try {
    messageBoard.innerHTML = `<p>${movieQuote.getRandomQuote()}</p>`;
  } catch (err) {
    console.error("HomePage::err:", err);
    messageBoard.innerHTML = err + `<p>${movieQuote.getRandomQuote()}</p>`;
  }
};

export default HomePage;
