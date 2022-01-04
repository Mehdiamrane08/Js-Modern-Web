"use strict";

import { setLayout } from "./utils/render.js";
import FilmLibrary from "./domain/FilmLibrary.js";
import Film from "./domain/Film.js";

const HEADER_TITLE = "JavaScript & Node.js full course";
const PAGE_TITLE = "Table generation & Object-Oriented Programming";
const FOOTER_TEXT = "Happy learning : )";

const myTableFilms = document.getElementById("tableFilms");
const myForm = document.querySelector("form");
const title = document.getElementById("title");
const duration = document.getElementById("duration");
const budget = document.getElementById("budget");
const link = document.getElementById("link");
const myFilmLibrary = new FilmLibrary();

myForm.addEventListener("submit", function (event) {
  event.preventDefault();
  let newFilm = new Film(title.value, duration.value, budget.value, link.value);
  myFilmLibrary.addFilm(newFilm);
  // test to see if our collection is protected against change in objects
  newFilm.title = "External change to object after added to collection";
  myTableFilms.innerHTML = myFilmLibrary.getHtmlTable();
    
});

setLayout(HEADER_TITLE, PAGE_TITLE, FOOTER_TEXT);
