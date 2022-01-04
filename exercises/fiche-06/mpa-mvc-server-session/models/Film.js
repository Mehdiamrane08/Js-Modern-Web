"use strict";

class Film {
  constructor(title,duration,budget,link) {
    this.title = title;
    this.duration = duration;
    this.budget = budget;
    // add protocole if needed to the link
    if (!link.match(/^(http|https)/)) link = "http://" + link;
    this.link = link;
  }

  save() {
    let filmList = initConnectionToFilmList();
    filmList.push({title:this.title,duration:this.duration,budget:this.budget,link:this.link});
  }

  static get list() {
    const filmList = initConnectionToFilmList();
    return filmList;
  }
}

function initConnectionToFilmList() {
  let app = require("../app.js");
  if (!app.locals.filmList) app.locals.filmList = [];
  return app.locals.filmList;
}

module.exports = Film;