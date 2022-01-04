import callAPI from "../../utils/api/fetch.js";
import { getIdToken } from "../../utils/auths/authPopup.js";
import {  
  updateGenericModal2,
  closeGenericModal,
  getFormOuterHtmlFromObject,
  getFormDataOnSubmit,
} from "../../utils/render.js";

const ProjectUpdate = async (projectId, admin, projectGroup) => {
  // because the projectData row could be refreshed, ensure that you
  // get the last version of the data when it is asked to update this project
  // deal with a modal
  try {
    const projectFound = await callAPI(
      "/api/projects/" + projectId,
      "GET",
      getIdToken()
    );

    if (!projectFound) return;

    /* textearea is considered if rows exists and is bigger than 1 */
    const configuration = [
      {
        title: "Identifiant du projet",
        dataKey: "_id",
        type: "text",
        hidden: true,
      },
      { title: "Nom du projet", dataKey: "name", type: "text", hidden: true },
      {
        title: "Description du projet",
        dataKey: "description",
        rows: 4,
        hidden: false,
      },
      {
        title: "Membres du projet",
        dataKey: "projectMembers",
        type: "text",
        hidden: true,
      },
      {
        title: "Statut du projet",
        dataKey: "status",
        type: "text",
        hidden: true,
      },
      {
        title: "Date de création du projet",
        dataKey: "creationDate",
        type: "time",
        hidden: true,
      },
      {
        title: "Url du repository pour le frontend",
        dataKey: "frontendRepo",
        type: "url",
        hidden: false,
      },
      {
        title: "Url du repository pour le backend",
        dataKey: "backendRepo",
        type: "url",
        hidden: false,
      },
      {
        title: "Url de la vidéo de présentation du projet",
        dataKey: "presentationUrl",
        type: "url",
        hidden: false,
      },
      {
        title: "Url du frontend déployé",
        dataKey: "frontendProductionUrl",
        type: "url",
        hidden: false,
      },
      {
        title: "Url du backend déployé",
        dataKey: "frontendProductionUrl",
        type: "url",
        hidden: false,
      },
      {
        title: "Nom du groupe de projets associés",
        dataKey: "projectGroupName",
        type: "text",
        hidden: true,
      },
      {
        title: "Projet public ?",
        dataKey: "isPublic",  
        type: "checkbox",      
        hidden: true,       
      },/*
      {
        title: "Nom du projet pour le public",
        dataKey: "publicName",
        type: "text",
        hidden: true,
      },
      {
        title: "Description pour le public",
        dataKey: "publicDescription",
        type: "text",
        hidden: true,
      },
      {
        title: "Description des auteurs pour le public",
        dataKey: "publicAuthors",
        type: "text",
        hidden: true,
      },*/
      {
        title: "Sauver",
        type: "submit",
        id: "sauverBtn",
      },
    ];

    /*deal with fields that shall be shown if the user is an admin*/
    if (admin) {
      configuration.find(
        (element) => element.dataKey === "name"
      ).hidden = false;
    }

    /* provide the choice to make a project public */
    if (projectGroup.status == "advertising") {
      configuration.find(
        (element) => element.dataKey === "isPublic"
      ).hidden = false;
    }


    const modalForm = getFormOuterHtmlFromObject(projectFound, configuration);

    updateGenericModal2("Vue du projet", modalForm);

    document
      .querySelector("form")
      .addEventListener("submit", onSaveClick(projectId, configuration));
  } catch (err) {
    console.error("Project update :: error", err);
  }
};

const onSaveClick = (projectId, configuration) => async (e) => {
  // send the new data to the api
  e.preventDefault();

  const data = getFormDataOnSubmit(configuration);

  try {
    const updatedProject = await callAPI(
      "/api/projects/" + projectId,
      "PATCH",
      getIdToken(),
      data
    );
    closeGenericModal();
  } catch (err) {
    console.error("onUpdateClick::fetch", err);
  }
};

export default ProjectUpdate;
