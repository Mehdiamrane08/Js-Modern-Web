import PageLayout from "./PageLayout.js";
import {PageRouter} from "./Router.js";

// set the router component
//Router();
let app = PageLayout();

const App = () => {
    // let app = `<div data-component-name="App">` + PageLayout() + `</div>`; 
    let nodeToAttach = document.querySelector("data-component-name='App'");
    // create the first child nodes
    nodeToAttach.innerHTML = app;
    
    //return app;  
};

export default App;