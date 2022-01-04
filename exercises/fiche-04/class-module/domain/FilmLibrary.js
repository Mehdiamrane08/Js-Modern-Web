"use strict";
import {
  getTableInnerHtmlFrom2DArray,
  updateTextToHyperlink,
} from "../utils/render.js";

import {
  addRowAtIndex,
  deleteColumnFrom2DArray,
  transformArrayOfObjectsTo2DArray,
} from "../utils/array.js";

class FilmLibrary {
  constructor() {
    this.filmLibrary = [];
  }

  addFilm(film) {
    if (!film) return false;
    // Shallow cloning the film via the Spread operator `...` : {...}
    // updating the film id : this is the moment to provide an id when the film is added to the collection !
    this.filmLibrary.push({...film, id:this.nextFilmId()});
    return true;
  }

  getHtmlTable() {
    // make a deep clone of the dataArray
    let filmLibraryClone = JSON.parse(JSON.stringify(this.filmLibrary));
    // transform objects to arrays
    let filmLibrary2DArray = transformArrayOfObjectsTo2DArray(filmLibraryClone);
    // remove column with id elements
    deleteColumnFrom2DArray(filmLibrary2DArray, 0);    
    // update the text column with hyperlinks based on the text and href columns
    updateTextToHyperlink(filmLibrary2DArray, 0, 3);
    // remove column with href elements
    deleteColumnFrom2DArray(filmLibrary2DArray, 3);
    // add headers row
    const headerArray = ["title", "duration", "budget"];
    addRowAtIndex(filmLibrary2DArray, headerArray, 0);
    return getTableInnerHtmlFrom2DArray(filmLibrary2DArray);
  }

  nextFilmId(){
    return this.filmLibrary.length;
  }
}

export default FilmLibrary;
