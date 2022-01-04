import {
  GenericFunctionalComponent,
  createOrUpdateBasicElement,
  getTableOuterHtmlFromArray,
  setLayout,
} from "../../../utils/render.js";
import MyReviewSummary from "../MyReviews/MyReviewSummary.js";
import PrintError from "../../PrintError.js";
import { getIdToken, getUserName } from "../../../utils/auths/authPopup.js";
import callAPI from "../../../utils/api/fetch.js";
import {
  createArrayOfObjects,
  updatePropertyWithDataToAllObjects,
} from "../../../utils/array/array.js";
import { getNamesFromEmail } from "../../../utils/string/string.js";
import MyReviewForm from "../MyReviews/MyReviewForm.js";
import ProjectReviewSummary from "./ProjectReviewSummary.js";

const CLASS_TITLES = "review-title";
const CLASS_VALUES = "review-value";

const ReadReviewPage = async (props) => {
  // template initialisation : MyReviewSummary is rendered at the top of the page div
  setLayout("Détails d'une revue de projet");

  try {
    // if it is an update, re-render the whole component component
    if (props.isUpdated) {
      props.currentHtmlElement.innerHTML = "";
      // update the state as a new review has been performed
      const allReviews = await callAPI(
        `/api/reviews/projectgroups/${props.state.projectGroup._id}/summary`, //+ CURRENT_PROJECT_GROUP,
        "get",
        props.state.user.token,
        undefined
      );
      // add the reviews to the state if necessary
      if (allReviews.length > 0) props.state.allReviews = allReviews;
    }

    // deal with state data, to make it available to other components
    // if it is a reload, it will be a new component, but the state
    // will be pop from the browser history inside the router !

    if (!props.isUpdated) {
      //props.state = {};
      props.state.user = {};
      props.state.user.token = getIdToken();
      props.state.user.userName = getUserName();
      const projectGroup = await callAPI(
        "/api/projectgroups/default", //+ CURRENT_PROJECT_GROUP,
        "get",
        props.state.user.token,
        undefined
      );

      if (!projectGroup) return;

      props.state.projectGroup = projectGroup;

      // don't allow reviews if the project group status is not or was not yet in "review"
      if (projectGroup.status === "init" || projectGroup.status === "dev") {
        // set the page template, the review summary
        PrintError({
          innerText: `La saison de revues des projets n'a pas encore été ouverte.
        Nous nous réjouissons de vous revoir tout bientôt pour évaluer les projets de vos collègues.
        Une annonce sera faite une fois la saison ouverte ; )`,
        });
        return;
      }
    }

    // set the page template, the review summary
    const reviewHeader = createOrUpdateBasicElement({
      parentHtmlElement: props.currentHtmlElement,
      componentName: "ReviewHeader",
    });

    await ProjectReviewSummary({
      parentHtmlElement: reviewHeader,
      state: props.state,
    });

    await MyReviewSummary({
      parentHtmlElement: reviewHeader,
      renderDelayed: true,
      state: props.state,
    });

    // get the detailled review to be printed
    // we are to deal with creation of a review
    const detailedReview = props.state.allReviews.find(
      (item) => item._id === props.state.projectId
    );

    // Add an icon to add a free review only when the review :
    // has not been performed by userName (projectReviews)
    // AND the username is not part of the projectMembers
    // AND the userName has no expectedReviews (it shall never happened, tested before even trying to render the table)
    // AND the project group is in review
    const addFreeReview =
      detailedReview.projectMembers.includes(props.state.user.userName) ||
      detailedReview.projectReviews.find(
        (element) => element.userName === props.state.user.userName
      ) ||
      props.state.myReviewSummary.expectedReviews > 0 ||
      props.state.projectGroup.status !== "review"
        ? undefined
        : `<i class="fas fa-plus fa-2x potential-review"></i>
      <i class="fas fa-comment fa-2x potential-review"></i>          
      `;

    if (addFreeReview) {
      const potentialReview = createOrUpdateBasicElement({
        parentHtmlElement: props.currentHtmlElement,
        componentName: "PotentialReview",
        innerHTML: addFreeReview,
      });
      potentialReview.addEventListener("click", (e) =>
        MyReviewForm({
          parentHtmlElement: props.currentHtmlElement,
          state: { ...props.state, isDetailedReview: true },
        })
      );
    }

    /*
    // set a container for the project summary
    const projectInfo = createOrUpdateBasicElement({
      parentHtmlElement: props.currentHtmlElement,
      componentName: "ProjectInfo",
    });

    const columnConfiguration = [
      { dataKey: "review-property", columnTitle: "Propriété", hidden: false },
      { dataKey: "review-value", columnTitle: "Valeur", hidden: false },
    ];

    const rowConfiguration = {
      isHeaderRowHidden: true,
      verticalHeaders: [
        { rowTitle: "<b>Nom du projet</b>", dataKey: "name" },
        { rowTitle: "<b>Description du projet</b>", dataKey: "description" },
        { rowTitle: "<b>Membres du projet</b>", dataKey: "projectMembers" },
        {
          rowTitle: "<b>Url de la vidéo de présentation du projet</b>",
          dataKey: "presentationUrl",
        },
        {
          rowTitle: "<b>Url du repository pour le frontend</b>",
          dataKey: "frontendRepo",
        },
        {
          rowTitle: "<b>Url du repository pour le backend</b>",
          dataKey: "backendRepo",
        },        
        {
          rowTitle: "<b>Url du frontend déployé</b>",
          dataKey: "frontendProductionUrl",
        },       
      ],
    };

    let projectInfoCloned = JSON.parse(JSON.stringify(detailedReview));

    // update info regarding the project members, from an Array to a String
    let projectMembers;
    if (projectInfoCloned.projectMembers.length > 0) {
      projectMembers = projectInfoCloned.projectMembers.map((member) =>
        getNamesFromEmail(member)
      );
      projectMembers = projectMembers.join(", ");
      projectInfoCloned.projectMembers = projectMembers;
    }

    // transpose the array of values to an array of objects
    const projectInfoToDisplay = createArrayOfObjects(
      rowConfiguration,
      columnConfiguration,
      projectInfoCloned
    );

    // replace
    updatePropertyWithDataToAllObjects(
      projectInfoToDisplay,
      "review-value",
      setValueItemPropertyValueFromObject
    );

    const projectTableElement = getTableOuterHtmlFromArray(
      projectInfoToDisplay,
      columnConfiguration,
      rowConfiguration
    );

    projectInfo.appendChild(projectTableElement);*/

    // get a clone of the info to be used to create the review table
    let projectInfoCloned = JSON.parse(JSON.stringify(detailedReview));
    //console.log("clone:", projectInfoCloned);
    // set a container for the detailed review
    const reviewInfo = createOrUpdateBasicElement({
      parentHtmlElement: props.currentHtmlElement,
      componentName: "ReviewInfo",
      className: "table-responsive",
    });

    // deal with the table
    const reviewTable = document.createElement("table");
    reviewTable.className = "table table-bordered";
    const projectReviews = projectInfoCloned.projectReviews;
    const reviewCount = projectInfoCloned.projectReviews.length;
    let line = document.createElement("tr");
    let header = document.createElement("th");
    header.className = CLASS_TITLES;
    let cell = document.createElement("td");
    cell.className = CLASS_VALUES;

    // deal with the project name
    header.innerText = "Nom du projet";
    cell.innerHTML = projectInfoCloned.name;
    line.appendChild(header);
    line.appendChild(cell);
    reviewTable.appendChild(line);

    // deal with the project description
    line = document.createElement("tr");
    header = document.createElement("th");
    cell = document.createElement("td");
    header.innerText = "Description du projet";
    cell.innerHTML = projectInfoCloned.description;
    header.className = CLASS_TITLES;
    cell.className = CLASS_VALUES;
    line.appendChild(header);
    line.appendChild(cell);
    reviewTable.appendChild(line);

    // deal with the project members
    // update info regarding the project members, from an Array to a String
    let projectMembers = "";
    if (projectInfoCloned.projectMembers.length > 0) {
      projectMembers = projectInfoCloned.projectMembers.map((member) =>
        getNamesFromEmail(member)
      );
      projectMembers = projectMembers.join(", ");
    }
    line = document.createElement("tr");
    header = document.createElement("th");
    cell = document.createElement("td");
    header.innerText = "Membres du projet";
    cell.innerHTML = projectMembers;
    header.className = CLASS_TITLES;
    cell.className = CLASS_VALUES;
    line.appendChild(header);
    line.appendChild(cell);
    reviewTable.appendChild(line);

    // deal with presentation video URL
    line = document.createElement("tr");
    header = document.createElement("th");
    cell = document.createElement("td");
    header.innerText = "Url de la vidéo de présentation du projet";
    header.className = CLASS_TITLES;
    cell.className = CLASS_VALUES;
    if (!projectInfoCloned.presentationUrl)
      projectInfoCloned.presentationUrl = "";
    else if (projectInfoCloned.presentationUrl.includes("youtu")) {
      // get the youtube id
      const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
      const match = projectInfoCloned.presentationUrl.match(regExp);
      if (match && match[2].length == 11) {
        //print a thumbnail
        projectInfoCloned.presentationUrl = `<a href="${projectInfoCloned.presentationUrl}" target="_blank">
        <img src="https://img.youtube.com/vi/${match[2]}/hqdefault.jpg" class="img-fluid youtube-picture">
        ${projectInfoCloned.presentationUrl}</a>`;
      } else {
        //error just print a link
        projectInfoCloned.presentationUrl = `<a href="${projectInfoCloned.presentationUrl}" target="_blank">${projectInfoCloned.presentationUrl}</a>`;
      }
    } else {
      projectInfoCloned.presentationUrl = `<a href="${projectInfoCloned.presentationUrl}" target="_blank">${projectInfoCloned.presentationUrl}</a>`;
    }
    cell.innerHTML = projectInfoCloned.presentationUrl;
    line.appendChild(header);
    line.appendChild(cell);
    reviewTable.appendChild(line);

    //deal with the frontend repo
    line = document.createElement("tr");
    header = document.createElement("th");
    cell = document.createElement("td");
    header.innerHTML = "URL pour le repository du frontend";
    cell.innerHTML = projectInfoCloned.frontendRepo
      ? `<a href="${projectInfoCloned.frontendRepo}" target="_blank">${projectInfoCloned.frontendRepo}</a>`
      : "";
    header.className = CLASS_TITLES;
    cell.className = CLASS_VALUES;
    line.appendChild(header);
    line.appendChild(cell);
    reviewTable.appendChild(line);

    //deal with the backend repo
    line = document.createElement("tr");
    header = document.createElement("th");
    cell = document.createElement("td");
    header.innerHTML = "URL pour le repository du backend";
    cell.innerHTML = projectInfoCloned.backendRepo
      ? `<a href="${projectInfoCloned.backendRepo}" target="_blank">${projectInfoCloned.backendRepo}</a>`
      : "";
    header.className = CLASS_TITLES;
    cell.className = CLASS_VALUES;
    line.appendChild(header);
    line.appendChild(cell);
    reviewTable.appendChild(line);

    //deal with the frontend URL
    line = document.createElement("tr");
    header = document.createElement("th");
    cell = document.createElement("td");
    header.innerHTML = "URL du frontend déployé";
    cell.innerHTML = projectInfoCloned.frontendProductionUrl
      ? `<a href="${projectInfoCloned.frontendProductionUrl}" target="_blank">${projectInfoCloned.frontendProductionUrl}</a>`
      : "";
    line.appendChild(header);
    line.appendChild(cell);
    header.className = CLASS_TITLES;
    cell.className = CLASS_VALUES;
    reviewTable.appendChild(line);

    // deal with the praise
    line = document.createElement("tr");
    header = document.createElement("th");
    header.innerText = "Points forts";
    header.rowSpan = reviewCount;
    header.className = CLASS_TITLES;

    line.appendChild(header);
    let firstRow = true;
    projectReviews.forEach((review) => {
      if (!firstRow) line = document.createElement("tr");
      firstRow = false;
      const names = getNamesFromEmail(review.userName);
      const cell = document.createElement("td");

      cell.innerHTML = `<q>${review.praise}</q>
                         <br><i><small>- ${names}</small></i>`;
      cell.className = CLASS_VALUES;
      line.appendChild(cell);
      reviewTable.appendChild(line);
    });

    // deal with the improvement points
    line = document.createElement("tr");
    header = document.createElement("th");
    header.innerText = "Points à améliorer";
    header.rowSpan = reviewCount;
    header.className = "review-titles";
    header.className = CLASS_TITLES;
    line.appendChild(header);
    firstRow = true;
    projectReviews.forEach((review) => {
      if (!firstRow) line = document.createElement("tr");
      firstRow = false;
      const names = getNamesFromEmail(review.userName);
      const cell = document.createElement("td");
      cell.innerHTML = `<q>${review.notImpressed}</q>
                         <br><i><small>- ${names}</small></i>`;
      cell.className = CLASS_VALUES;
      line.appendChild(cell);
      reviewTable.appendChild(line);
    });

    reviewInfo.appendChild(reviewTable);

    // initialisation of the Error component
    PrintError();
  } catch (err) {
    console.error("ReadReviewPage::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
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

export default GenericFunctionalComponent(ReadReviewPage);
