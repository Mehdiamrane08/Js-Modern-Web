"strict mode";
/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {headerTitle} headerTitle
 * @param {pageTitle} pageTitle
 * @param {footerText} footerText
 */
function setLayout(headerTitle, pageTitle, footerText) {
  document.querySelector("#headerTitle").innerText = headerTitle;
  document.querySelector("title").innerText = pageTitle;
  document.querySelector("#pageTitle").innerText = pageTitle;
  document.querySelector("#footerText").innerText = footerText;
}

/**
 *
 * @param {Array} headerArray : array with all the header titles
 * @param {Array} arrayToDisplay : input data to be represented as a table : array of objects (JSON)
 * @returns {string} myTable.outerHTML : provides with the outerHtml of the table element
 */
const getTableInnerHtmlFromArrayOfObjects = (headerArray, arrayToDisplay) => {
  const myTable = document.createElement("table");
  // set the class name of the element to use bootstrap table element
  myTable.className = "table table-bordered text-nowrap";
  // identifies the data to be printed
  const dataColumns = Object.keys(arrayToDisplay[0]);
  // Deal with the header line
  const myHeaders = document.createElement("tr");
  myTable.appendChild(myHeaders);
  for (let index = 0; index < headerArray.length; index++) {
    const header = document.createElement("th");
    header.textContent = headerArray[index];
    myHeaders.appendChild(header);
  }

  for (let x = 0; x < arrayToDisplay.length; x++) {
    //for each line, add a <tr> element
    const myLine = document.createElement("tr");
    // for each <tr> element, append it to the <table> element
    myTable.appendChild(myLine);
    //for each cell, add a <td> element, assign to it the given value in the array, and append the <td> element to the <tr> element

    for (let y = 0; y < headerArray.length; y++) {
      const myCell = document.createElement("td");
      if (Array.isArray(arrayToDisplay[x][dataColumns[y]])) {
        myCell.innerHTML =
          "<ul class='list-group'>" +
          arrayToDisplay[x][dataColumns[y]]
            .map((subItem) => `<li class='list-group-item'>${subItem}</td>`)
            .join("") +
          "</ul>";
      } else myCell.textContent = arrayToDisplay[x][dataColumns[y]];

      myLine.appendChild(myCell);
    }
  }
  return myTable.outerHTML;
};

/**
 * Provide an outerHtml representation (string) of a 2D array
 * @param {Array} dataArray : input data to be represented as a table : 2D array.
 * It shall contain a header.
 * @returns {string} myTable.outerHtml : provides with the outerHtml of the table element
 */
const getTableInnerHtmlFrom2DArray = (dataArray, arrayToDisplay) => {
  const myTable = document.createElement("table");
  // set the class name of the element to use bootstrap table element
  myTable.className = "table table-bordered text-nowrap";

  for (let x = 0; x < dataArray.length; x++) {
    //for each line, add a <tr> element
    const myLine = document.createElement("tr");
    // for each <tr> element, append it to the <table> element
    myTable.appendChild(myLine);
    //for each cell, add a <td> element, assign to it the given value in the array, and append the <td> element to the <tr> element

    for (let y = 0; y < dataArray[0].length; y++) {
      if (x === 0) {
        // deal with the header
        const header = document.createElement("th");
        header.innerHTML = dataArray[0][y];
        myLine.appendChild(header);
      } else {
        const myCell = document.createElement("td");
        if (Array.isArray(dataArray[x][y])) {
          myCell.innerHTML =
            "<ul class='list-group'>" +
            dataArray[x][y]
              .map((subItem) => `<li class='list-group-item'>${subItem}</td>`)
              .join("") +
            "</ul>";
        } else if (dataArray[x][y]) myCell.innerHTML = dataArray[x][y];
        else myCell.innerHTML = "";
        myLine.appendChild(myCell);
      }
    }
  }
  return myTable.outerHTML;
};

/**
 *
 * @param {string} tableSelector : CSS selector providing an access to the table to be updated
 * @param {Array} columnsToBeDeletedArray : array with columns header to be deleted
 * @return {Number} numberOfColDeleted : returns the number of columns deleted
 */
const deleteColumnsFromTable = (tableSelector, columnsToBeDeletedArray) => {
  let numberOfColDeleted = 0;
  let tableToUpdate = document.querySelector(tableSelector);
  columnsToBeDeletedArray.forEach((element) => {
    for (let col = 0; col < tableToUpdate.rows[0].cells.length; col++) {
      if (
        element.toLowerCase() ===
        tableToUpdate.rows[0].cells[col].textContent.toLowerCase()
      ) {
        // delete the whole column
        for (let row = 0; row < tableToUpdate.rows.length; row++) {
          tableToUpdate.rows[row].deleteCell(col);
        }
        ++numberOfColDeleted;
      }
    }
  });

  return numberOfColDeleted;
};

/**
 * This functions replace the text elements with hyperlinks. Note that the dataArray shall not contain headers
 * @param {Array} dataArray : 2D array containing a column with text and another with href elements
 * @param {Number} textColumnId : column index of 2D array containing pointing to text for the hyperlinks
 * @param {Number} hrefColumnId : column index of 2D array containing pointing to href for the hyperlinks
 * @returns {Boolean} isUpdated
 */
const updateTextToHyperlink = (dataArray, textColumnId, hrefColumnId) => {
  let isUpdated = false;
  dataArray.forEach((row) => {
    // create absolute links (www.google.com is not absolute,
    // we need to add the protocol such as http://www.google.com)
    let href;
    if (row[hrefColumnId].match(/^(http|https)/)) href = row[hrefColumnId];
    else href = "http://" + row[hrefColumnId];
    row[textColumnId] = `<a href="${href}" target="_blank">${row[textColumnId]}</a>`;
    isUpdated = true;
  });
  return isUpdated;
};

// named export
export {
  setLayout,
  getTableInnerHtmlFromArrayOfObjects,
  getTableInnerHtmlFrom2DArray,
  deleteColumnsFromTable,
  updateTextToHyperlink,
};
