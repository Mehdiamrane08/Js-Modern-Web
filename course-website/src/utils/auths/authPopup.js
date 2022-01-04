// Create the main myMSALObj instance
// configuration parameters are located at authConfig.js
import { msalConfig, loginRequest } from "./authConfig.js";
import graphConfig from "../graph/graphConfig.js";
import * as Msal from "msal";
import { RedirectUrl } from "../../Components/Router.js";
import Navbar from "../../Components/Navbar.js";
//import {saveToSessionStorage} from "../storage/sessionStorage.js";

const myMSALObj = new Msal.UserAgentApplication(msalConfig);
let rawIdToken;

function signIn() {
  myMSALObj
    .loginPopup(loginRequest)
    .then((loginResponse) => {
      //console.log("id_token acquired at: " + new Date().toString());
      //console.log("loginResponse:" , loginResponse);
      rawIdToken = loginResponse.idToken.rawIdToken;
      const accountData = myMSALObj.getAccount();
      if (accountData) {
        console.log("sign in:", accountData);
        //const {userName, name} = accountData;
        //saveToSessionStorage("user", {userName, name})
        // end of the authentication through the Azure AD pop-up
        // Redirect to a specific route
        Navbar();
        return RedirectUrl("/projects");
      }
      console.log("no account ?");
      return loginResponse;
    })
    .catch((error) => {
      console.error("signIn error:", error);
      throw error;
    });
}

function signOut() {
  myMSALObj.logout();
}

const getUserName = () =>
  myMSALObj.getAccount() ? myMSALObj.getAccount().userName : undefined;

const getName = () =>
  myMSALObj.getAccount() ? myMSALObj.getAccount().name : undefined;
const getIdToken = () =>
  myMSALObj.getAccount() ? sessionStorage.getItem("msal.idtoken") : undefined;

const acquireTokenSilent = () => {
  return myMSALObj
    .acquireTokenSilent(loginRequest)
    .then((loginResponse) => {
      //console.log("silent id_token renewed at: " + new Date().toString());
      //console.log("loginResponse:" , loginResponse);
      // Redirect to a specific route
      Navbar();
      return RedirectUrl("/projects");
    })
    .catch((error) => {
      console.error(error);
      //console.log("silent token acquisition fails. acquiring token using popup");
      signIn();
    });
};

export {
  signIn,
  signOut,
  myMSALObj,
  getUserName,
  getName,
  getIdToken,
  acquireTokenSilent,
};
