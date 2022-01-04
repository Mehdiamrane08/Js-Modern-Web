import { setLayout } from "../utils/render.js";
import COURSE_CONTENT from "../data/content.js";
import {
  addPropertyWithDataToAllObjects,
  updatePropertyWithDataToAllObjects,
} from "../utils/array/array.js";
import { getTableOuterHtmlFromArray } from "../utils/render.js";
let page = document.querySelector("#page");
const TABLE_ID = "contentTable";

const ContentPage = () => {
  setLayout("Contenu du cours");
  let contentPage = `
  <div id="${TABLE_ID}" class="table-responsive"></div>
`;
  page.innerHTML = contentPage;
  renderTable();
};

const renderTable = async () => {
  try {
    const tableDiv = document.getElementById(TABLE_ID);

    const columnConfiguration = [
      // part shall be generated later
      { dataKey: "part", columnTitle: "Partie", hidden: false },
      {
        dataKey: "subject",
        columnTitle: "Sujet",
        hidden: false,
      },
      {
        dataKey: "courseFiles",
        columnTitle: "Documentation de présentation",
        hidden: false,
      },

      {
        dataKey: "courseVideos",
        columnTitle: "Vidéo de présentation",
        hidden: false,
      },
      {
        dataKey: "courseDemos",
        columnTitle: "Code de démonstration",
        hidden: false,
      },
      {
        dataKey: "exerciceInstructions",
        columnTitle: "Fiche d'exercices",
        hidden: false,
      },
      {
        dataKey: "exerciceSolutions",
        columnTitle: "Code des solutions aux exercices",
        hidden: false,
      },
    ];

    const rowConfiguration = {
      isHeaderRowHidden: false,
    };

    let dataArrayCloned = JSON.parse(JSON.stringify(COURSE_CONTENT));

    // deal with a new part property to be added to all objects
    addPropertyWithDataToAllObjects(
      dataArrayCloned,
      "part",
      undefined,
      (object, index) => index + 1
    );

    // deal with courseFiles property
    updatePropertyWithDataToAllObjects(
      dataArrayCloned,
      "courseFiles",
      setLinkPropertyValueFromObject
    );

    // deal with courseVideos property
    updatePropertyWithDataToAllObjects(
      dataArrayCloned,
      "courseVideos",
      setLinkPropertyValueFromObject
    );

    // deal with courseDemos property
    updatePropertyWithDataToAllObjects(
      dataArrayCloned,
      "courseDemos",
      setLinkPropertyValueFromObject
    );

    // deal with exerciceInstructions property
    updatePropertyWithDataToAllObjects(
      dataArrayCloned,
      "exerciceInstructions",
      setLinkPropertyValueFromObject
    );

    // deal with exerciceSolutions property
    updatePropertyWithDataToAllObjects(
      dataArrayCloned,
      "exerciceSolutions",
      setLinkPropertyValueFromObject
    );

    const tableElement = getTableOuterHtmlFromArray(
      dataArrayCloned,
      columnConfiguration,
      rowConfiguration
    );

    tableDiv.innerHTML = "";
    tableDiv.appendChild(tableElement);
  } catch (err) {
    console.error("ContentPage::Error:", err);
  }
};

const setLinkPropertyValueFromObject = (propertyName, element) => {
  // create absolute links (www.google.com is not absolute,
  // we need to add the protocol such as http://www.google.com)
  let href;

  if (
    element &&
    element[propertyName] &&
    Array.isArray(element[propertyName]) &&
    element[propertyName].length > 0
  ) {
    element[propertyName] = element[propertyName].map(
      (file) => `<a href="${file.url}" target="_blank">${file.name}</a>`
    );
  }
};

export default ContentPage;
