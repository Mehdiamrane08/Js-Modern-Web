import {signOut} from "../utils/auths/authPopup.js";

const Logout = () => {    
    // call the popup function from MS Azure AD
    signOut();   
};

export default Logout;
