import {signIn} from "../utils/auths/authPopup.js";


const Login = () => {    
    // call the popup function from MS Azure AD
    signIn();
    //acquireTokenSilent();   
};

export default Login;
