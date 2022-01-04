let backToTopButton;

/**
 * setLayout allows to display specific information in an HTML template
 * containing those paramters as id to text elements (h4, h5, title)
 * @param {pageTitle} pageTitle
 * @param {headerTitle} headerTitle
 * @param {footerText} footerText
 */
function setLayout(pageTitle, headerTitle, footerText) {
  if (headerTitle)
    document.querySelector("#headerTitle").innerText = headerTitle;
  if (pageTitle) {
    document.querySelector("title").innerText = pageTitle;
    document.querySelector("#pageTitle").innerText = pageTitle;
  }
  if (footerText) document.querySelector("#footerText").innerText = footerText;
}

// deal with the back to the top button. Inspired from https://www.w3schools.com/howto/howto_js_scroll_to_top.asp
const onScroll = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTopButton.style.display = "block";
  } else {
    backToTopButton.style.display = "none";
  }
};

// When the user clicks on the button, scroll to the top of the document
const onClick = () => {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
};

const printDynamicHtmlTableWithInnerHtml = (headerRow, arrayToDisplay) => {
  // Neat way to loop through all data in the array, create a new array of string elements (HTML tr/td tags)
  // with map(), and create one string from the resulting array with join(''). '' means that the separator is a void string.
  let linesHtml = arrayToDisplay
    .map(
      (line) =>
        `<tr>${Object.keys(line)
          .map((key) => `<td>${line[key]}</td>`)
          .join("")}</tr>`
    )
    .join("");
  const tableHtml = `<div class="table-responsive">
          <table class="table table-bordered text-nowrap">
          <thead>
            ${headerRow}    
          </thead>
          <tbody>
            ${linesHtml}
          </tbody>
                    </table>
                    </div>`;
  return tableHtml;
};

const printDynamicHtmlTable = (containerId, headerArray, arrayToDisplay) => {
  // access to the div container where we want to create a dynamic html table
  const divContainer = document.getElementById(containerId);
  // Clear any table from the div_container
  divContainer.innerHTML = "";
  const myTable = document.createElement("table");
  // set the class name of the element to use bootstrap table element
  myTable.className = "table table-bordered text-nowrap";

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
      if (y < dataColumns.length) {
        if (Array.isArray(arrayToDisplay[x][dataColumns[y]])) {
          myCell.innerHTML =
            "<ul class='list-group'>" +
            arrayToDisplay[x][dataColumns[y]]
              .map((subItem) => `<li class='list-group-item'>${subItem}</td>`)
              .join("") +
            "</ul>";
        } else myCell.textContent = arrayToDisplay[x][dataColumns[y]];
      } else {
        // add buttons
        if (y === dataColumns.length) {
          const joinBtn = document.createElement("a");
          joinBtn.className = "join btn btn-dark";
          //joinBtn.addEventListener("click", onJoinClick);
          joinBtn.textContent = "Join";
          joinBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(joinBtn);
        } else if (y === dataColumns.length + 1) {
          const quitBtn = document.createElement("a");
          quitBtn.className = "quit btn btn-dark";
          //quitBtn.addEventListener("click", onQuitClick);
          quitBtn.textContent = "Quit";
          quitBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(quitBtn);
        } else if (y === dataColumns.length + 2) {
          const updateBtn = document.createElement("a");
          updateBtn.className = "update btn btn-dark";
          //quitBtn.addEventListener("click", onQuitClick);
          updateBtn.textContent = "Update";
          updateBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(updateBtn);
        } else if (y === dataColumns.length + 3) {
          const deleteBtn = document.createElement("a");
          deleteBtn.className = "delete btn btn-dark";
          //quitBtn.addEventListener("click", onQuitClick);
          deleteBtn.textContent = "Delete";
          deleteBtn.dataset.itemId = arrayToDisplay[x][dataColumns[0]];
          myCell.appendChild(deleteBtn);
        }
      }
      //myCell.textContent = "test";
      myLine.appendChild(myCell);
    }
  }
  // append the new empty table element to the div container
  divContainer.appendChild(myTable);
};

/**
 * Provide an outerHtml representation (string) of a 2D array
 * @param {Array} dataArray : input data to be represented as a table : 2D array.
 * It shall contain a header.
 * @param {Array} visibleColumnHeaders : onlyDisplayRequestedColumn based on array of column headers. If undefined, display all columns.
 * @param {Array} hiddenDataAttributeKeys : add data attributes to each table row, except for the header. An index is always added as data-index.
 * If no hiddenDataAttributeKeys, don't add extra data attributes, else add all values in table row for each column corresponding to a key.
 * Format of the name for the data-attribute : data-hiddenDataAttributeKeys[i].toLowerCase() & any space is replaced by "-"
 * @param {boolean} headerRowIsHidden : ask to hide all headers
 * @returns {string} myTable.outerHtml : provides with the outerHtml of the table element
 * A data attribute data-column-name is added to each cell in order to be able to hide columns based on their headerName
 */
const getTableOuterHtmlFrom2DArray = (
  dataArray,
  visibleColumnHeaders,
  hiddenDataAttributeKeys,
  headerRowIsHidden = false
) => {
  // prepare the visibleColumnHeaders array to wear the correct name to be used as dataAttributes
  if (visibleColumnHeaders && visibleColumnHeaders.length > 0)
    visibleColumnHeaders = visibleColumnHeaders.map((columnHeader) =>
      columnHeader.toLowerCase().replace(/\s/g, "")
    );

  let columnsToAddDataAttributes;
  if (
    dataArray &&
    dataArray.length > 0 &&
    hiddenDataAttributeKeys &&
    hiddenDataAttributeKeys.length > 0
  ) {
    columnsToAddDataAttributes = hiddenDataAttributeKeys.map((columnHeader) =>
      dataArray[0].indexOf(columnHeader)
    );
  }

  const myTable = document.createElement("table");
  // set the class name of the element to use bootstrap table element
  myTable.className = "table table-bordered";

  for (let x = 0; x < dataArray.length; x++) {
    //for each line, add a <tr> element
    const myLine = document.createElement("tr");
    // deal with column width : add flex support
    myLine.classList.add("d-flex");
    // for each <tr> element, append it to the <table> element
    myTable.appendChild(myLine);
    //for each cell, add a <td> element, assign to it the given value in the array, and append the <td> element to the <tr> element

    for (let y = 0; y < dataArray[0].length; y++) {
      if (x === 0) {
        // deal with the header
        const header = document.createElement("th");
        header.innerHTML = dataArray[0][y];
        // deal with providing the column name in each cell (to hide columns later) with data-columnName attribute
        const currentColumnName = dataArray[0][y]
          .toLowerCase()
          .replace(/\s/g, "");
        header.dataset.columnName = currentColumnName;
        // hide the header if all headers shall not be displayed
        if (headerRowIsHidden) header.classList.add("d-none");
        // hide the header if not in visibleColumnHeaders
        else if (
          visibleColumnHeaders &&
          visibleColumnHeaders.length > 0 &&
          !visibleColumnHeaders.includes(currentColumnName)
        )
          header.classList.add("d-none");

        // deal with column width
        //header.classList.add("w-15");
        header.classList.add("col-6");
        header.classList.add("col-sm-2");
        //header.classList.add("text-break");
        myLine.appendChild(header);
      } else {
        // deal with hidden data
        // add the data-index attribute
        myLine.dataset.index = x - 1;
        if (
          columnsToAddDataAttributes &&
          columnsToAddDataAttributes.length > 0
        ) {
          columnsToAddDataAttributes.forEach((hiddenColumnIndex, index) => {
            const dataAttributeName = hiddenDataAttributeKeys[index]
              .toLowerCase()
              .replace(/\s/g, "");
            // find column index
            myLine.dataset[dataAttributeName] = dataArray[x][hiddenColumnIndex];
          });
        }
        // deal with regular column content
        const myCell = document.createElement("td");
        // deal with providing the column name in each cell (to hide columns later) with data-columnName attribute
        const currentColumnName = dataArray[0][y]
          .toLowerCase()
          .replace(/\s/g, "");
        myCell.dataset.columnName = currentColumnName;
        // hide the cell if not in visibleColumnHeaders
        if (
          visibleColumnHeaders &&
          visibleColumnHeaders.length > 0 &&
          !visibleColumnHeaders.includes(currentColumnName)
        )
          myCell.classList.add("d-none");
        if (Array.isArray(dataArray[x][y])) {
          myCell.innerHTML =
            "<ul class='list-group'>" +
            dataArray[x][y]
              .map(
                (subItem) =>
                  `<li class='list-group-item text-break'>${subItem}</td>`
              )
              .join("") +
            "</ul>";
        } else if (dataArray[x][y]) myCell.innerHTML = dataArray[x][y];
        else myCell.innerHTML = "";
        // deal with column width
        //myCell.classList.add("w-15");
        myCell.classList.add("col-6");
        myCell.classList.add("col-sm-2");
        myLine.appendChild(myCell);
      }
    }
  }
  return myTable.outerHTML;
};

/**
 * Provide an outerHtml representation (string) of an Array of Objects.
 * @param {Array} dataArray : input data - array of objects - to be represented as a table. It shall not contain headers !
 * @param {Array} columnConfiguration : each object property - in order to become a column -
 * is to be configured based on a object such as { dataKey: "_id", columnTitle: "Id", hidden: true }.
 * Render the columns in the order of the objects given in columnConfiguration, when dataKey value is found on an object.
 * Discard the rendering of dataArray object properties not given in a dataKey of columnConfiguration.
 * Only display requested columns where hidden is false.
 * If undefined, display all columns. Get the column header name based on the columnTitle. If no columnTitle, the columnTitle is
 * considered as being the dataKey.
 * @param {Array} rowConfiguration : rowConfiguration.hiddenDataAttributes : add data attributes to each table row, except for the header. An index is always added as data-index.
 * If no rowConfiguration.hiddenDataAttributes , don't add extra data attributes, else add all values in table row for each column corresponding to a key.
 * Format of the name for the data-attribute : data-hiddenDataAttributes[i].
 * rowConfiguration.isHeaderRowHidden : deal if the header row shall be hidden
 * @param {boolean} headerRowIsHidden : ask to hide all headers
 * @returns {HTMLTableElement} myTable : provides with the HTML table element
 * A data attribute data-property-name is added to each cell in order to be able to hide columns based on their headerName.
 * A class is also added for the same purpose, className is linked to the dataKey in columnConfiguration
 */
const getTableOuterHtmlFromArray = (
  dataArray,
  columnConfiguration,
  rowConfiguration
) => {
  const isHeaderRowHidden =
    !rowConfiguration || rowConfiguration.isHeaderRowHidden === undefined
      ? false
      : rowConfiguration.isHeaderRowHidden;

  const myTable = document.createElement("table");
  // set the class name of the element to use bootstrap table element
  myTable.className = "table table-bordered";

  for (let x = -1; x < dataArray.length; x++) {
    let isHiddenValueAdded = false;
    const myLine = document.createElement("tr");
    //myLine.classList.add("row");
    // deal with column width : add flex support
    /*if (
    columnConfiguration &&
    columnConfiguration[0].class &&
    columnConfiguration[0].class.includes("col")
  )
    myLine.classList.add("d-flex");*/

    // for each <tr> element, append it to the <table> element
    myTable.appendChild(myLine);
    //for each cell, add a <td> element, assign to it the given value in the array, and append the <td> element to the <tr> element

    // for all the required data attributes
    let requiredColumns;
    if (columnConfiguration) requiredColumns = columnConfiguration;
    else requiredColumns = Object.keys(dataArray[0]);
    requiredColumns.forEach((column) => {
      let columnKey;
      let columnHeader;
      let columnIsHidden;
      let columnClass;
      if (columnConfiguration) {
        if (!column.dataKey && column.columnTitle)
          columnKey = column.columnTitle.toLowerCase().replace(/\s/g, "");
        else columnKey = column.dataKey;
        if (!column.columnTitle && column.dataKey)
          columnHeader = column.column.dataKey;
        else columnHeader = column.columnTitle;
        if (column.hidden === undefined) columnIsHidden = false;
        else columnIsHidden = column.hidden;
        if (column.class) columnClass = column.class;
        if (column.className) columnClass = column.className;
      }
      // default table,
      else {
        columnKey = column;
        columnHeader = column;
        columnIsHidden = false;
        columnClass = "col";
      }

      if (x === -1) {
        // deal with the header
        const header = document.createElement("th");
        header.innerHTML = columnHeader;
        // deal with providing the column name in each cell (to hide columns later) with data-columnName attribute
        header.dataset.columnName = columnKey;
        if (columnClass) header.className = columnClass;
        header.classList.add(columnKey);

        //header.style.width = "100px";
        // hide the header if all headers shall not be displayed
        if (isHeaderRowHidden) myLine.classList.add("d-none");
        // hide the header if requested
        else if (columnIsHidden) header.classList.add("d-none");
        // deal with column width
        //header.className = columnClass;
        //header.classList.add("col-sm-2");
        //header.classList.add("text-break");
        myLine.appendChild(header);
      } else {
        // deal with hidden data to be added at the line level
        // add the data-index attribute
        if (!isHiddenValueAdded) {
          myLine.dataset.index = x;
          // add all the attributes required in hiddenDataAttributeKeys
          if (
            rowConfiguration &&
            rowConfiguration.hiddenDataAttributes &&
            rowConfiguration.hiddenDataAttributes.length > 0
          ) {
            rowConfiguration.hiddenDataAttributes.forEach((hiddenInfoName) => {
              myLine.dataset[hiddenInfoName] = dataArray[x][hiddenInfoName];
            });
          }
          isHiddenValueAdded = true;
        }
        // deal with regular column content
        const myCell = document.createElement("td");
        // deal with providing the column name in each cell (to hide columns later) with data-columnName attribut
        myCell.dataset.columnName = columnKey;
        if (columnClass) myCell.className = columnClass;
        myCell.classList.add(columnKey);
        // hide the cell if not in visibleColumnHeaders
        if (columnIsHidden) myCell.classList.add("d-none");
        if (Array.isArray(dataArray[x][columnKey])) {
          const ul = document.createElement("ul");
          ul.classList.add("list-group");
          dataArray[x][columnKey].forEach((item) => {
            const li = document.createElement("li");
            li.innerHTML = item;
            li.classList.add("list-group-item");
            ul.appendChild(li);
          });
          myCell.appendChild(ul);
        } else if (dataArray[x][columnKey])
          myCell.innerHTML = dataArray[x][columnKey];
        else myCell.innerHTML = "";
        // deal with column width
        //myCell.className = columnClass;
        //myCell.classList.add("col-6");
        //myCell.classList.add("col-sm-2");
        myLine.appendChild(myCell);
      }
    });
  }
  return myTable;
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
 * This functions replace the text elements with hyperlinks.
 * Currently it does not try to provide links for cells that contains an Array.
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
    let hyperlinkToBeCreated = false;
    if (row[hrefColumnId] && !Array.isArray(row[hrefColumnId])) {
      if (row[hrefColumnId].match(/^(http|https)/)) {
        href = row[hrefColumnId];
        hyperlinkToBeCreated = true;
      } else if (row[hrefColumnId].match(/^(www\.)/)) {
        href = "http://" + row[hrefColumnId];
        hyperlinkToBeCreated = true;
      }

      if (hyperlinkToBeCreated) {
        row[
          textColumnId
        ] = `<a href="${href}" target="_blank">${row[textColumnId]}</a>`;
        isUpdated = true;
      }
    }
  });
  return isUpdated;
};

const genericModalOuterHtml = `<div class="modal" tabindex="-1" role="dialog" id="genericModal">
      <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title"></h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary close" data-dismiss="modal">Close</button>  
          </div>
        </div>
      </div>
    </div>`;

// deal with closing events on the generic Modal (to be independant of JQuery)
const genericModalOnClose = () => {
  const modalCloseButtons = document.querySelectorAll(".close");
  modalCloseButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      closeGenericModal();
    });
  });
};

// deal with closing events on the generic Modal (to be independant of JQuery)
const closeGenericModal = () => {
  const genericModal = document.getElementById("genericModal");
  genericModal.classList.remove("show");
  genericModal.style.display = "none";
  // deal with the scrolling of the body, not of the modal
  const body = document.querySelector("body");
  body.style.overflow = "auto";
};

const showGenericModal = () => {
  // display a modal without using JQuery
  const genericModal = document.getElementById("genericModal");
  genericModal.style.display = "block";
  genericModal.classList.add("show");
  // deal with the scrolling of the modal, not of the body
  genericModal.style.overflow = "auto";
  const body = document.querySelector("body");
  body.style.overflow = "hidden";
};

/**
 * Update a modal based on a String representation of HTML elements
 * @param {string} title
 * @param {string} body
 */
const updateGenericModal = (title, body) => {
  const genericModalTitle = document.querySelector(".modal-title");
  genericModalTitle.textContent = title;
  const genericModalBody = document.querySelector(".modal-body");
  genericModalBody.innerHTML = body;
};

/**
 * Update a modal based on a given HTMLFormElement
 * @param {string} title
 * @param {HTMLFormElement} htmlForm
 */
const updateGenericModal2 = (title, htmlForm) => {
  const genericModalTitle = document.querySelector(".modal-title");
  genericModalTitle.textContent = title;
  const genericModalBody = document.querySelector(".modal-body");
  genericModalBody.innerHTML = "";
  genericModalBody.appendChild(htmlForm);
};

/**
 * Provides an HTML form based on object properties and configuration data
 * @param {Object} object
 * @param {Array} configuration
 * @returns {HTMLFormElement}
 */
const getFormOuterHtmlFromObject = (object, configuration) => {
  if (!configuration) return;

  const form = document.createElement("form");
  configuration.forEach((element) => {
    if (!element.hidden) {
      const div = document.createElement("div");
      if (element.type !== "submit") {
        div.classList.add("form-group");
        const label = document.createElement("label");
        label.innerHTML = element.title;
        label.for = element.dataKey;
        div.appendChild(label);
        let input;

        if (element.rows && element.rows > 1) {
          input = document.createElement("textarea");
          input.rows = element.rows;
          if (object && object[element.dataKey] !== undefined)
            input.innerHTML = object[element.dataKey];
        } else {
          input = document.createElement("input");
          input.type = element.type;
          if (object && object[element.dataKey] !== undefined) {
            input.value = object[element.dataKey];
            if (input.type === "checkbox") {
              if (typeof object[element.dataKey] === "string")
                input.checked = JSON.parse(
                  object[element.dataKey].toLowerCase()
                );
              else input.checked = object[element.dataKey];
            }
          }
        }
        input.classList.add("form-control");
        input.name = element.dataKey;
        input.id = element.dataKey;
        if (element.disabled) input.disabled = true;
        if (element.required) input.required = true;
        div.appendChild(input);
        form.appendChild(div);
      }
      //deal with submit button / input
      else {
        const submit = document.createElement("input");
        submit.type = "submit";
        submit.className = "btn btn-primary";
        submit.value = element.title;
        submit.id = element.id;
        form.appendChild(submit);
      }
    }
  });
  return form;
};

/**
 * Return an object that contains each input name (key) and input value (value)
 * @param {Array} configuration
 * @returns {Object} data on Submit
 */
const getFormDataOnSubmit = (configuration) => {
  let data = {};
  configuration.forEach((element) => {
    if (!element.hidden && !element.disabled && element.type !== "submit") {
      if (element.type === "checkbox")
        data[element.dataKey] = document.getElementById(
          element.dataKey
        ).checked;
      else {
        const inputValue = document.getElementById(element.dataKey).value;
        data[element.dataKey] = inputValue;
      }
    }
  });
  return data;
};

/**
 *
 * @param {*} props *
 */
const createOrUpdateBasicElement = (props) => {
  if (!props || (props && !props.componentName))
    throw new Error(
      "Please add a componentName property in the 1sts argument of your functional element."
    );
  if (!props.tagName) props.tagName = "div";

  const elementToBeUpdated = getElementToBeUpdated(props);
  if (elementToBeUpdated) {
    // Update the HTML Element within the DOM
    updateBasicElement(props, elementToBeUpdated);
    return elementToBeUpdated;
  }
  // An HTML element cannot be created & added to the DOM if there is no given parentHtmlElement
  if (!props || (props && !props.parentHtmlElement))
    throw new Error(
      "Please add a parentHtmlElement property in the 1sts argument of your functional element."
    );

  // create html Element and deals with generic props
  const htmlElement = createBasicElement(props);
  return htmlElement;
};

/**
 *
 * @param {*} props
 * @returns {HTMLElement}
 */
const getElementToBeUpdated = (props) => {
  let id;
  //const { id =undefined } = props;
  if (props && props["id"]) id = props["id"];
  let element;
  element = queryExistingElement(id, props.componentName);
  if (!element) return;
  // Check if there is a real id
  if (element.id !== undefined && element.id.length !== 0) {
    if (element.id === id) return element;
    else return;
  } else return element;
};

/**
 * Update a basic HTML element based on given props.
 * All valid properties for the given tagName are allocated to the htmlElementToUpdate.
 * @param {Object} props
 * @param {String} htmlElementToUpdate
 */
const updateBasicElement = (props, htmlElementToUpdate) => {
  // deal with generic props, with all provided properties linked to an html attribute
  if (props) props.isUpdated = true;
  for (const property in props) {
    // if the key is a valid attribute of the given htmlElement
    if (htmlElementToUpdate[property] !== undefined && property !== "tagName") {
      htmlElementToUpdate[property] = props[property]; // allocate the value for the given key in props
    }
  }
  return htmlElementToUpdate;
};

/**
 * Create, most of the time render, & return a basic HTML element based on given props.
 * All valid properties for the given tagName are allocated to the returne HTML element.
 * @param {Object} props
 * @returns {HTMLElement}
 */
const createBasicElement = (props) => {
  // deal with generic props, with all provided properties linked to an html attribute
  // An HTML element cannot be created & added to the DOM if there is no given parentHtmlElement
  if (!props || (props && !props.tagName))
    throw new Error(
      "Please add a tagName property in the 1sts argument of your functional element."
    );

  const htmlElement = document.createElement(props.tagName);

  for (const property in props) {
    // if the key is a valid attribute of the given htmlElement
    if (htmlElement[property] !== undefined && property !== "tagName")
      htmlElement[property] = props[property]; // allocate the value for the given key in props
  }

  if (!props || (props && !props.componentName))
    throw new Error(
      "Please add a componentName property in the 1sts argument of your functional element."
    );
  // hide the component name
  htmlElement.dataset.componentName = props.componentName;
  // add the component name as a class name (hyphens, words hyphenated) for CSS use
  // first force the first letter to be lowerCase
  let cssName =
    props.componentName[0].toLowerCase() + props.componentName.slice(1);

  cssName = cssName.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);
  htmlElement.classList.add(cssName);
  if (props) {
    props.isUpdated = false;
    // render the basic component if required
    if (props.parentHtmlElement && !props.renderDelayed)
      props.parentHtmlElement.appendChild(htmlElement);
  }

  return htmlElement;
};

/**
 *
 * @param {*} id
 * @param {*} componentName
 */
const queryExistingElement = (id, componentName) => {
  // hide the caller (generally a functional component) within a data attribute
  let existingElement;
  if (!id) {
    existingElement = queryElement(componentName);
    return existingElement;
  }
  existingElement = document.getElementById(id);
  return existingElement;
};

/**
 * Returns an HTML Element based on the name of a functional Component
 * NB : usually, it is createBasicElement that hide the name of a funcional Component in an HTMLelement
 * @param {String} componentName
 * @returns {HTMLElement}
 */
const queryElement = (componentName) => {
  const cssSelector = `[data-component-name="${componentName}"]`;
  return document.querySelector(cssSelector);
};

/**
 *
 * @param {*} component
 */
const GenericFunctionalComponent = (component) => {
  const pageDiv = document.getElementById("page");
  const defaultProps = {
    parentHtmlElement: pageDiv,
    tagName: "div",
    componentName: component.name,
  };

  return (props) => {
    if (!props) props = { ...defaultProps };
    else props = { ...defaultProps, ...props };
    if (!props.state) {
      props.state = {};
    }
    const currentHtmlElement = createOrUpdateBasicElement(props);
    props = { ...props, currentHtmlElement: currentHtmlElement };
    return component(props);
  };
};

// named export
export {
  setLayout,
  //getTableInnerHtmlFromArrayOfObjects,
  getTableOuterHtmlFrom2DArray,
  getTableOuterHtmlFromArray,
  deleteColumnsFromTable,
  updateTextToHyperlink,
  //printDynamicHtmlTableWithInnerHtml,
  printDynamicHtmlTable,
  genericModalOuterHtml,
  updateGenericModal2,
  genericModalOnClose,
  showGenericModal,
  updateGenericModal,
  closeGenericModal,
  getFormOuterHtmlFromObject,
  getFormDataOnSubmit,
  createOrUpdateBasicElement,
  GenericFunctionalComponent,
};
