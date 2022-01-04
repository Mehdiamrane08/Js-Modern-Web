import { setLayout } from "./utils/render.js";
import {Router} from "./Components/Router.js";
import Navbar from "./Components/Navbar.js";
/* use webpack style & css loader*/
import "./stylesheets/style.css";
/* load bootstrap css (web pack asset management) */
import 'bootstrap/dist/css/bootstrap.css';
/* load bootstrap module (JS) */
import 'bootstrap';

// fontawsome symbols
import '@fortawesome/fontawesome-free/js/all'
/*
import '@fortawesome/fontawesome-free/js/fontawesome'
import '@fortawesome/fontawesome-free/js/solid'
import '@fortawesome/fontawesome-free/js/regular'
import '@fortawesome/fontawesome-free/js/brands'*/


const HEADER_TITLE = "JavaScript & Node.js full course";
const FOOTER_TEXT = "Happy learning : )";

Navbar();

Router();

setLayout(undefined, HEADER_TITLE, FOOTER_TEXT);
