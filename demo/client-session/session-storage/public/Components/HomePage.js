let homePage = `<p>Welcome to MyCMS...</p>
`;
let page = document.querySelector("#page");
let timer;

const HomePage = async () => {
  console.log("HomePage: start");
  let page = document.querySelector("#page");
  page.innerHTML = homePage;
};

export default HomePage;
