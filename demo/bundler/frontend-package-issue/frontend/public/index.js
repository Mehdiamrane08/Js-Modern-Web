import { setLayout } from "./utils/render.js";
import HomePage from "./Components/HomePage.js";
import {Router} from "./Components/Router.js";
import Navbar from "./Components/Navbar.js";

const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE = "Demo : use of package in the browser via require ?";
const FOOTER_TEXT = "Happy learning : )";

Navbar();

Router();

setLayout(HEADER_TITLE, PAGE_TITLE, FOOTER_TEXT);
