let homePage = `<p>Welcome to MyCMS...</p>
`;

const HomePage = async () => {
  console.log("HomePage: start");
  let page = document.querySelector("#page");
  page.innerHTML = homePage;
};

export default HomePage;