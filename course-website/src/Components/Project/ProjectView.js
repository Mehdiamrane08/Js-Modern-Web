import {
  getTableOuterHtmlFromArray,
  genericModalOuterHtml,
  genericModalOnClose,
  showGenericModal,
  updateGenericModal,
} from "../../utils/render.js";

import {
  createArrayOfObjects,
  updatePropertyWithDataToAllObjects,
} from "../../utils/array/array.js";

import ProjectUpdate from "./ProjectUpdate";
import { getNamesFromEmail } from "../../utils/string/string.js";

const ProjectView = async (
  projectId,
  index,
  projectData,
  admin,
  userName,
  projectGroup
) => {
  try {
    let projectModal = document.querySelector("#projectModal");
    // add a generic modal to the project page
    // Warning : an update to the page remove the eventListener on the Add Project button...
    projectModal.innerHTML = genericModalOuterHtml;
    // deal with the modal events when clicks on close buttons (hide the modal)
    genericModalOnClose();

    const columnConfiguration = [
      { dataKey: "property", columnTitle: "Propriété", hidden: false },
      { dataKey: "value", columnTitle: "Valeur", hidden: false },
    ];

    const rowConfiguration = {
      isHeaderRowHidden: true,
      verticalHeaders: [
        { rowTitle: "<b>Nom du projet</b>", dataKey: "name" },
        { rowTitle: "<b>Description du projet</b>", dataKey: "description" },
        { rowTitle: "<b>Membres du projet</b>", dataKey: "projectMembers" },

        {
          rowTitle: "<b>Url du repository pour le frontend</b>",
          dataKey: "frontendRepo",
        },
        {
          rowTitle: "<b>Url du repository pour le backend</b>",
          dataKey: "backendRepo",
        },
        {
          rowTitle: "<b>Url de la vidéo de présentation du projet</b>",
          dataKey: "presentationUrl",
        },
        {
          rowTitle: "<b>Url du frontend déployé</b>",
          dataKey: "frontendProductionUrl",
        },
        {
          rowTitle: "<b>Url du backend déployé</b>",
          dataKey: "frontendProductionUrl",
        },
        {
          rowTitle: "<b>Projet public ?</b>",
          dataKey: "isPublic",
        } /*
        {
          rowTitle: "<b>Nom du projet pour le public</b>",
          dataKey: "publicName",
        },
        {
          rowTitle: "<b>Description pour le public</b>",
          dataKey: "publicDescription",
        },
        {
          rowTitle: "<b>Description des auteurs pour le public</b>",
          dataKey: "publicDescription",
        },*/,
      ],
    };

    let dataArrayCloned = JSON.parse(JSON.stringify(projectData));

    let valueObject = dataArrayCloned[index];

    // update info regarding the project members, from an Array to a String
    let projectMembers;
    if (valueObject.projectMembers.length > 0) {
      projectMembers = valueObject.projectMembers.map((member) =>
        getNamesFromEmail(member)
      );
      projectMembers = projectMembers.join(", ");
      valueObject.projectMembers = projectMembers;
    } else valueObject.projectMembers = "";

    // update info in regards to the presentation video
    if (!valueObject.presentationUrl) valueObject.presentationUrl = "";
    else if (valueObject.presentationUrl.includes("youtu")) {
      // get the youtube id
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = valueObject.presentationUrl.match(regExp);
      if (match && match[2].length == 11) {
        //print a thumbnail
        valueObject.presentationUrl = `<a href="${valueObject.presentationUrl}" target="_blank">
        <img src="https://img.youtube.com/vi/${match[2]}/hqdefault.jpg" class="img-fluid youtube-picture">
        ${valueObject.presentationUrl}</a>`;
      } else {
        //error just print a link
        valueObject.presentationUrl = `<a href="${valueObject.presentationUrl}" target="_blank">${valueObject.presentationUrl}</a>`;
      }
    } else {
      valueObject.presentationUrl = `<a href="${valueObject.presentationUrl}" target="_blank">${valueObject.presentationUrl}</a>`;
    }

    // update info in regards to isPublic
    let checked;
    if (typeof valueObject.isPublic === "string")
      checked = JSON.parse(valueObject.isPublic.toLowerCase());
    else checked = valueObject.isPublic;
    valueObject.isPublic = `<input type="checkbox" class="form-control" name="isPublic" id="isPublic" ${
      checked ? "checked" : ""
    } disabled>`;

    const dataArrayToDisplay = createArrayOfObjects(
      rowConfiguration,
      columnConfiguration,
      valueObject
    );

    updatePropertyWithDataToAllObjects(
      dataArrayToDisplay,
      "value",
      setValueItemPropertyValueFromObject
    );

    const tableElement = getTableOuterHtmlFromArray(
      dataArrayToDisplay,
      columnConfiguration,
      rowConfiguration
    );

    let modalBody = `
      <div class="table-responsive">            
          ${tableElement.outerHTML}               
      </div>            
    `;

    // deal with the update button
    // privilege needed : project member or admin
    const userHasSufficientPrivilege =
      admin | projectData[index].projectMembers.includes(userName);
    if (userHasSufficientPrivilege)
      modalBody += `<input type="button" class="btn btn-primary" value="Modifier" id="updateProjectBtn"/>`;
    updateGenericModal("Vue du projet", modalBody);
    showGenericModal();
    if (userHasSufficientPrivilege) {
      const btn = document.getElementById("updateProjectBtn");
      btn.addEventListener(
        "click",
        onUpdateClick(projectId, admin, projectGroup)
      );
    }
  } catch (err) {
    console.error("Project Page::Error:", err);
  }
};

const onUpdateClick = (projectId, admin, projectGroup) => async (e) => {
  // because the projectData row could be refreshed, ensure that you
  // get the last version of the data when it is asked to update this project
  // deal with a modal
  ProjectUpdate(projectId, admin, projectGroup);
};

const setValueItemPropertyValueFromObject = (propertyName, element) => {
  // create absolute links (www.google.com is not absolute,
  // we need to add the protocol such as http://www.google.com)
  let href;
  let hyperlinkToBeCreated = false;
  if (
    element &&
    element[propertyName] &&
    !Array.isArray(element[propertyName])
  ) {
    if (element[propertyName].match(/^(http|https)/)) {
      href = element[propertyName];
      hyperlinkToBeCreated = true;
    } else if (element[propertyName].match(/^(www\.)/)) {
      href = "http://" + element[propertyName];
      hyperlinkToBeCreated = true;
    }

    if (hyperlinkToBeCreated) {
      element[
        propertyName
      ] = `<a href="${href}" target="_blank">${element[propertyName]}</a>`;
    }
  }
};

export default ProjectView;
