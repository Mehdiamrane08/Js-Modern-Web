import { loginRequest } from "../utils/auths/authConfig.js";

//import HomePage from "./HomePage.js";
import AboutPage from "./AboutPage.js";
import ContentPage from "./ContentPage.js";
import ErrorPage from "./ErrorPage.js";
import Login from "./Login.js";
import LoginTempPage from "./LoginTempPage.js";
import SecureComponent from "./SecureComponent.js";
import Logout from "./Logout.js";
import ProjectPage from "./Project/ProjectPage.js";
import ReadMyReviewsPage from "./Review/MyReviews/ReadMyReviewsPage.js";
import ReadAllReviewsPage from "./Review/AllReviews/ReadAllReviewsPage.js";
import DetailedReviewPage from "./Review/DetailedReview/ReadReviewPage.js";
import PublicProjectPage from "./PublicProject/PublicProjectPage.js";


const routes = {
  "/": ContentPage,
  "/contenu": ContentPage,
  "/about": AboutPage,
  "/publicprojects": PublicProjectPage,
  "/error": ErrorPage,
  "/login": Login,
  "/logintemp": LoginTempPage,
  "/logout": Logout,
  "/projects": SecureComponent(ProjectPage),
  "/my-reviews": ReadMyReviewsPage,
  "/all-reviews": ReadAllReviewsPage,
  "/detailed-review": DetailedReviewPage,
};

let componentToRender;

// dictionnary of routes
const Router = () => {
  /* manage to route the right component when the page is loaded */
  window.addEventListener("load", (e) => {
    //console.log("onload page:", [window.location.pathname]);
    componentToRender = routes[window.location.pathname];
    if (!componentToRender)
      return ErrorPage(
        new Error(
          "The " + window.location.pathname + " ressource does not exist."
        )
      );
    const page = document.getElementById("page");
    page.innerHTML = "";
    //console.log("state:", history.state);
    if (history.state) {     
      return componentToRender(history.state);
    }
    componentToRender();    
  });

  /* manage click on any link*/
  const onNavigate = (e) => {
    let uri;
    if (
      (e.target.dataset.uri && e.target.tagName === "A") ||
      (e.target.tagName === "IMG" &&
        e.target.parentElement.tagName === "A" &&
        e.target.parentElement.dataset.uri)
    ) {
      e.preventDefault();
      // To get a data attribute through the dataset object, get the property by the part of the attribute name after data- (note that dashes are converted to camelCase).
      if (e.target.tagName === "A") uri = e.target.dataset.uri;
      // we are having an img embedded in a hyperlink
      else uri = e.target.parentElement.dataset.uri;
    }
    if (uri) {
      /*console.log(
        "onNavigate() uri:",
        uri,
        " location:",
        window.location.pathname,
        " origin :",
        window.location.origin
      );*/
      // use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
      window.history.pushState({}, uri, window.location.origin + uri);
      // render the requested component
      // for the components that include JS, we want to assure that the JS included is not runned when the JS file is charged by the browser
      // therefore, those components have to be either a function or a class
      componentToRender = routes[uri];
      if (routes[uri]) {
        const page = document.getElementById("page");
        page.innerHTML = "";
        componentToRender();
      } else {
        ErrorPage(new Error("The " + uri + " ressource does not exist"));
      }
    }
  };

  //navBar.addEventListener("click", onNavigate);
  document.addEventListener("click", onNavigate);

  // Display the right component when the user use the browsing history
  window.addEventListener("popstate", (e) => {
    componentToRender = routes[window.location.pathname];
    const page = document.getElementById("page");
    page.innerHTML = "";
    if (e.state) {     
      return componentToRender(e.state);
    }
    componentToRender();
  });
};

const RedirectUrl = (uri, data = {}) => {
  // use Web History API to add current page URL to the user's navigation history & set right URL in the browser (instead of "#")
  // push the data in the state if those are given
  window.history.pushState(data, uri, window.location.origin + uri);
  // render the requested component
  // for the components that include JS, we want to assure that the JS included is not runned when the JS file is charged by the browser
  // therefore, those components have to be either a function or a class
  componentToRender = routes[uri];
  if (routes[uri]) {
    const page = document.getElementById("page");
    page.innerHTML = "";
    if (!data) componentToRender();
    else componentToRender(data);
  } else {
    ErrorPage(new Error("The " + uri + " ressource does not exist"));
  }
};

export { Router, RedirectUrl };
