//import {loadFromSessionStorage} from "../utils/storage/sessionStorage.js";
import { getUserName } from "../utils/auths/authPopup.js";
import { RedirectUrl } from "./Router.js";

/**
 * In order to deal with secure routes, we can enhance a component
 * by ensuring that the user is authenticated prior to call the passed component.
 * this is a function that returns a function which takes the component to be secured.
 */
const SecureComponent = (component) => () => {
  const userName = getUserName();
  if (userName) return component();
  else RedirectUrl("/logintemp");
};

export default SecureComponent;
