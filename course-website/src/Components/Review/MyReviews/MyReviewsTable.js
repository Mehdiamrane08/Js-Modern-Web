import callAPI from "../../../utils/api/fetch.js";
import { GenericFunctionalComponent } from "../../../utils/render.js";
import { getTableOuterHtmlFromArray } from "../../../utils/render.js";
import {
  updatePropertyWithDataToAllObjects,
  addPropertyWithDataToAllObjects,
} from "../../../utils/array/array.js";
import MyReviewForm from "./MyReviewForm.js";
import PrintError from "../../PrintError.js";

const MAX_CHAR = 125;

const MyReviewsTable = async (props) => {
  try {
    if (!props.state) return;

    const myReviews = await callAPI(
      `/api/reviews/users/${props.state.user.userName}/projectgroups/${props.state.projectGroup._id}`, //+ CURRENT_PROJECT_GROUP,
      "get",
      props.state.user.token,
      undefined
    );

    // add the reviews to the state if necessary
    if (myReviews.length > 0) props.state.myReviews = myReviews;

    const columnConfiguration = [
      { dataKey: "name", columnTitle: "Nom du projet", hidden: false },
      {
        dataKey: "description",
        columnTitle: "Description courte",
        hidden: false,
        className: "short-description",
      },
      {
        dataKey: "presentationUrl",
        columnTitle: "Lien vers vidéo de présentation",
        hidden: false,
      },
      { columnTitle: "A revoir", hidden: false },
      {
        dataKey: "like",
        columnTitle: "Coup de coeur",
        hidden: false,
        className: "like-col",
      },
      { dataKey: "frontendRepo", columnTitle: "Repo frontend", hidden: false },
      { dataKey: "backendRepo", columnTitle: "Repo backend", hidden: false },
      {
        dataKey: "frontendProductionUrl",
        columnTitle: "URL du site",
        hidden: false,
      },
      { dataKey: "praise", columnTitle: "Point fort", hidden: false },
      {
        dataKey: "notImpressed",
        columnTitle: "Point d'amélioration",
        hidden: false,
      },
    ];

    const rowConfiguration = {
      hiddenDataAttributes: ["_id"],
      isHeaderRowHidden: false,
    };

    // update the data prior to render it (change a clone of the data)
    // shortened the description to MAX_CHAR
    let myReviewsCloned = JSON.parse(JSON.stringify(myReviews));
    updatePropertyWithDataToAllObjects(
      myReviewsCloned,
      "description",
      (key, element) =>
        (element[key] = element[key].substr(0, MAX_CHAR) + "...")
    );

    // add a thumbnail that is clickable for the productionUrl, if it's a youtube video
    // else just add a link
    // TEMP : only add a link...
    updatePropertyWithDataToAllObjects(
      myReviewsCloned,
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

    // add data to deal with reviews to be performed
    // add a key "arevoir" with  value being an HTML element that will include
    // a SVG icon "comment" from fontawsome only when the review is still expected
    // add a property to all object in the array, with a value based on passed callback
    // Do this only if the project group is in review
    if (props.state.projectGroup.status === "review") {
      addPropertyWithDataToAllObjects(
        myReviewsCloned,
        "arevoir",
        undefined,
        (item) =>
          item.endOfReviewDate
            ? `<div class="performed-review update-review">
          <i class="fas fa-check-circle fa-lg performed-review"></i>
          <br>
          <i class="fas fa-pen fa-lg update-review"></i>
          </div>`
            : `<div class="perform-review">
          <i class="fas fa-plus expected-review"></i>
          <i class="fas fa-comment fa-lg expected-review"></i>
          </div>`
      );
    }
    // hide the A revoir column
    else {
      columnConfiguration.find(
        (conf) => conf.columnTitle === "A revoir"
      ).hidden = true;
    }

    // deal with like data
    updatePropertyWithDataToAllObjects(
      myReviewsCloned,
      "like",
      (key, element) => {
        if (!element[key]) return "";
        //print a heart
        element[key] = `<i class="fas fa-heart fa-lg liked-review"></i>`;
      }
    );

    //deal with data associated to the frontend repo, backend repo, and the deployed frontend URL
    updatePropertyWithDataToAllObjects(
      myReviewsCloned,
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
      myReviewsCloned,
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
      myReviewsCloned,
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
      myReviewsCloned,
      columnConfiguration,
      rowConfiguration
    );

    props.currentHtmlElement.appendChild(table);

    // props.renderDelayed => auto render was disabled
    props.parentHtmlElement.appendChild(props.currentHtmlElement);

    // Attach event listenners on table
    let performReviews = document.querySelectorAll(".perform-review");
    performReviews.forEach((cellIcon) =>
      cellIcon.addEventListener("click", onPerformReview(props))
    );

    let updateReviews = document.querySelectorAll(".update-review");
    updateReviews.forEach((cellIcon) =>
      cellIcon.addEventListener("click", onUpdateReview(props))
    );
  } catch (err) {
    console.error("MyReviewsTable::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

const onPerformReview = (props) => (e) => {
  // the id is given in the current table row under data-id attribute
  //props.state._id =
  //e.target.parentElement.parentElement.parentElement.parentElement.dataset._id;
  if (e.target.parentElement.parentElement.dataset._id)
    props.state._id = e.target.parentElement.parentElement.dataset._id;
  else if (e.target.parentElement.parentElement.parentElement.dataset._id)
    props.state._id =
      e.target.parentElement.parentElement.parentElement.dataset._id;
  else if (
    e.target.parentElement.parentElement.parentElement.parentElement.dataset._id
  )
    props.state._id =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset._id;
  MyReviewForm({
    parentHtmlElement: props.currentHtmlElement,
    state: props.state,
  });
};

const onUpdateReview = (props) => (e) => {
  // the id is given in the current table row under data-id attribute
  //props.state._id =
  //e.target.parentElement.parentElement.parentElement.parentElement.dataset._id;
  if (e.target.parentElement.parentElement.dataset._id)
    props.state.projectIdFromMyReview =
      e.target.parentElement.parentElement.dataset._id;
  else if (e.target.parentElement.parentElement.parentElement.dataset._id)
    props.state.projectIdFromMyReview =
      e.target.parentElement.parentElement.parentElement.dataset._id;
  else if (
    e.target.parentElement.parentElement.parentElement.parentElement.dataset._id
  )
    props.state.projectIdFromMyReview =
      e.target.parentElement.parentElement.parentElement.parentElement.dataset._id;
  MyReviewForm({
    parentHtmlElement: props.currentHtmlElement,
    state: props.state,
  });
};

export default GenericFunctionalComponent(MyReviewsTable);

/*const table = document.createElement("table");
    

    //deal with header
    const thead = document.createElement("thead");    
    const headerLine = document.createElement("tr");
    const header1 = document.createElement("th");
    const header2 = document.createElement("th");
    const header3 = document.createElement("th");
    const header4 = document.createElement("th");
    const header5 = document.createElement("th");
    headerLine.appendChild(header1);
    headerLine.appendChild(header2);
    headerLine.appendChild(header3);
    headerLine.appendChild(header4);
    headerLine.appendChild(header5);
    thead.appendChild(headerLine);
    table.appendChild(thead);
    header1.innerText = "Nom du projet";
    header2.innerText = "Description courte";
    header3.innerText = "";


    //deal with body
    const tbody = document.createElement("tbody");
    
    
    table.appendChild(tbody);*/
