import callAPI from "../../../utils/api/fetch.js";
import { GenericFunctionalComponent } from "../../../utils/render.js";
import { getTableOuterHtmlFromArray } from "../../../utils/render.js";
import {
  updatePropertyWithDataToAllObjects,
  addPropertyWithDataToAllObjects,
} from "../../../utils/array/array.js";
import MyReviewForm from "../MyReviews/MyReviewForm.js";
import PrintError from "../../PrintError.js";
import { RedirectUrl } from "../../Router.js";

const MAX_CHAR = 125;

const AllReviewsTable = async (props) => {
  try {
    if (!props.state) return;

    // Print an error if you try to view the results and you still have expected reviews
    if (props.state.myReviewSummary.expectedReviews > 0) {
      if (props.state.projectGroup.status === "review")
        PrintError({
          innerText: `Veuillez compléter les revues qui vous ont été attribuées dans le Menu Revues de projets, Mes revues.
                Une fois vos ${props.state.myReviewSummary.expectedReviews} revues réalisées, 
                votre accès aux résultats sera débloqué  ; )`,
        });
      else
        PrintError({
          innerText: `Vous n'avez pas complété les ${props.state.myReviewSummary.expectedReviews} revues qui vous avait été attribuées dans le Menu Revues de projets, Mes revues.
                Votre accès aux résultats est donc bloqué  ; )`,
        });

      return;
    }

    const { allReviews } = props.state;

    // Deall with the all reviews summary

    const columnConfiguration = [
      { dataKey: "name", columnTitle: "Nom du projet", hidden: false },
      {
        dataKey: "description",
        columnTitle: "Description courte",
        hidden: false,
        className: "short-description",
      },
      {
        dataKey: "countLiked",
        columnTitle: "Coups de coeur",
        hidden: false,
      },
      ,
      {
        dataKey: "countReviews",
        columnTitle: "Nombre de revues",
        hidden: false,
      },
      { columnTitle: "Revue?", hidden: false },
      { columnTitle: "Détails?", hidden: false },
      {
        dataKey: "presentationUrl",
        columnTitle: "Lien vers vidéo de présentation",
        hidden: false,
      },
      { dataKey: "frontendRepo", columnTitle: "Repo frontend", hidden: false },
      { dataKey: "backendRepo", columnTitle: "Repo backend", hidden: false },
      {
        dataKey: "frontendProductionUrl",
        columnTitle: "URL du site",
        hidden: false,
      },
    ];

    const rowConfiguration = {
      hiddenDataAttributes: ["_id"],
      isHeaderRowHidden: false,
    };

    // update the data prior to render it (change a clone of the data)
    // shortened the description to MAX_CHAR
    let allReviewsCloned = JSON.parse(JSON.stringify(allReviews));
    updatePropertyWithDataToAllObjects(
      allReviewsCloned,
      "description",
      (key, element) =>
        (element[key] = element[key].substr(0, MAX_CHAR) + "...")
    );

    // add a thumbnail that is clickable for the productionUrl, if it's a youtube video
    // else just add a link
    // TEMP : only add a link...
    updatePropertyWithDataToAllObjects(
      allReviewsCloned,
      "presentationUrl",
      (key, element) => {
        if (!element[key]) return;
        if (element[key].includes("youtu")) {
          // get the youtube id
          const regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
          const match = element[key].match(regExp);
          if (match && match[2].length == 11) {
            //print a thumbnail
            element[key] = `<a href="${element[key]}" target="_blank">
            <img src="https://img.youtube.com/vi/${match[2]}/hqdefault.jpg" class="img-fluid">
            ${element[key]}</a>`;
          } else {
            //error just print a link
            element[
              key
            ] = `<a href="${element[key]}" target="_blank">${element[key]}</a>`;
          }
        } else {
          element[
            key
          ] = `<a href="${element[key]}" target="_blank">${element[key]}</a>`;
        }
      }
    );

    // add data to deal with reviews that could be performed
    // add a key "potential-review" with  value being an HTML element that will include
    // a SVG icon "comment" from fontawsome only when the review :
    // has not been performed by userName (projectReviews)
    // AND the username is not part of the projectMembers
    // AND the userName has no expectedReviews (it shall never happened, tested before even trying to render the table)
    // AND the project group status is in review
    addPropertyWithDataToAllObjects(
      allReviewsCloned,
      "revue?",
      undefined,
      (item) =>
        item.projectMembers.includes(props.state.user.userName) ||
        item.projectReviews.find(
          (element) => element.userName === props.state.user.userName
        ) ||
        props.state.myReviewSummary.expectedReviews > 0 ||
        props.state.projectGroup.status !== "review"
          ? ""
          : `<div class="potential-review">
          <i class="fas fa-plus potential-review"></i>
          <i class="fas fa-comment fa-lg potential-review"></i>          
          </div>`
    );

    // add data to deal with details of a review
    // add a key "detailled-review" with  value being an HTML element that will include
    // a SVG icon "eye" from fontawsome
    addPropertyWithDataToAllObjects(
      allReviewsCloned,
      "détails?",
      `<div class="detailed-review">
          <i class="fas fa-eye fa-lg detailed-review"></i>                
          </div>`
    );

    // add data to deal with reviews like
    addPropertyWithDataToAllObjects(
      allReviewsCloned,
      "countLiked",
      undefined,
      (item) =>
        item.countLiked > 0
          ? `<div class="liked-review">
            <i class="fas fa-heart fa-lg liked-review"></i>${item.countLiked}                   
            </div>`
          : ""
    );

    // add data to deal with performed review number
    addPropertyWithDataToAllObjects(
      allReviewsCloned,
      "countReviews",
      undefined,
      (item) =>
        item.countReviews > 0
          ? `<div class="performed-review">
            <i class="fas fa-comment fa-lg performed-review"></i>${item.countReviews}                   
            </div>`
          : ""
    );

    //deal with data associated to the frontend repo, backend repo, and the deployed frontend URL
    updatePropertyWithDataToAllObjects(
      allReviewsCloned,
      "frontendRepo",
      (key, element) => {
        if (!element[key]) return;
        //print a hyperlink (input is of type "url", so the link is good)
        element[
          key
        ] = `<a href="${element[key]}" target="_blank">${element[key]}</a>`;
      }
    );
    updatePropertyWithDataToAllObjects(
      allReviewsCloned,
      "backendRepo",
      (key, element) => {
        if (!element[key]) return;
        //print a hyperlink (input is of type "url", so the link is good)
        element[
          key
        ] = `<a href="${element[key]}" target="_blank">${element[key]}</a>`;
      }
    );

    updatePropertyWithDataToAllObjects(
      allReviewsCloned,
      "frontendProductionUrl",
      (key, element) => {
        if (!element[key]) return;
        //print a hyperlink (input is of type "url", so the link is good)
        element[
          key
        ] = `<a href="${element[key]}" target="_blank">${element[key]}</a>`;
      }
    );

    const table = getTableOuterHtmlFromArray(
      allReviewsCloned,
      columnConfiguration,
      rowConfiguration
    );

    props.currentHtmlElement.appendChild(table);

    // props.renderDelayed => auto render was disabled
    props.parentHtmlElement.appendChild(props.currentHtmlElement);

    // Attach event listenners on table
    let potentialReviews = document.querySelectorAll(".potential-review");
    potentialReviews.forEach((cellIcon) =>
      cellIcon.addEventListener("click", onPerformReview(props))
    );
    let detailedReviews = document.querySelectorAll(".detailed-review");
    detailedReviews.forEach((cellIcon) =>
      cellIcon.addEventListener("click", onDetailledReview(props))
    );
  } catch (err) {
    console.error("AllReviewsTable::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

const onPerformReview = (props) => (e) => {
  // the id is given in the current table row under data-id attribute
  if (e.target.parentElement.parentElement.dataset._id)
    props.state.projectId = e.target.parentElement.parentElement.dataset._id;
  else if (e.target.parentElement.parentElement.parentElement.dataset._id)
    props.state.projectId =
      e.target.parentElement.parentElement.parentElement.dataset._id;
  else if (
    e.target.parentElement.parentElement.parentElement.parentElement.dataset._id
  )
    props.state.projectId =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset._id;

  MyReviewForm({
    parentHtmlElement: props.currentHtmlElement,
    state: props.state,
  });
};

const onDetailledReview = (props) => (e) => {
  // the id is given in the current table row under data-id attribute
  if (e.target.parentElement.parentElement.dataset._id)
    props.state.projectId = e.target.parentElement.parentElement.dataset._id;
  else if (e.target.parentElement.parentElement.parentElement.dataset._id)
    props.state.projectId =
      e.target.parentElement.parentElement.parentElement.dataset._id;
  else if (
    e.target.parentElement.parentElement.parentElement.parentElement.dataset._id
  )
    props.state.projectId =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset._id;

  // Redirect to the ReadReviewPage, by giving the state data (to be reuse in regards to browser history operations)
  RedirectUrl("/detailed-review", { state: props.state });
};

export default GenericFunctionalComponent(AllReviewsTable);
