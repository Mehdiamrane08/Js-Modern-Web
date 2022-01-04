import callAPI from "../../../utils/api/fetch.js";
import ReadMyReviewsPage from "./ReadMyReviewsPage.js";
import PrintError from "../../PrintError.js";

import {
  GenericFunctionalComponent,
  getFormOuterHtmlFromObject,
  genericModalOuterHtml,
  genericModalOnClose,
  closeGenericModal,
  updateGenericModal2,
  showGenericModal,
  createOrUpdateBasicElement,
  getFormDataOnSubmit,
} from "../../../utils/render.js";
//import AllReviewsTable from "../AllReviews/AllReviewsTable.js";
import ReadAllReviewsPage from "../AllReviews/ReadAllReviewsPage.js";
import ReadReviewPage from "../DetailedReview/ReadReviewPage.js";

const MAX_CHAR = 125;

const MyReviewForm = async (props) => {
  try {
    if (!props.state) return;

    // set a #genericModal within a div
    const parentModal = document.querySelector("html");
    const modal = createOrUpdateBasicElement({
      componentName: "SuperGenericModal",
      parentHtmlElement: parentModal,
      innerHTML: genericModalOuterHtml,
    });

    // deal with the modal events when clicks on close buttons (hide the modal)
    genericModalOnClose();

    // deal with configuration of form
    /* textearea is considered if rows exists and is bigger than 1 */
    const configuration = [
      {
        title: "Identifiant de la revue",
        dataKey: "_id",
        type: "text",
        hidden: true,
      },
      {
        title: "Nom du projet",
        dataKey: "name",
        type: "text",
        hidden: false,
        disabled: true,
      },
      {
        title: "Description du projet",
        dataKey: "description",
        rows: 4,
        disabled: true,
      },
      {
        title: "Url de la vidéo de présentation du projet",
        dataKey: "presentationUrl",
        type: "url",
        disabled: true,
      },
      {
        title: "Point fort",
        dataKey: "praise",
        rows: 4,
        required: true,
      },
      {
        title: "Point d'amélioration",
        dataKey: "notImpressed",
        rows: 4,
        required: true,
      },

      {
        title: "Coup de coeur",
        dataKey: "like",
        type: "checkbox",
        disabled: props.state.myReviewSummary.availableLike > 0 ? false : true,
      },
      {
        title: "Sauver",
        type: "submit",
        id: "sauverBtn",
      },
    ];

    if (props.state._id) {
      // deal with a modification of an expected review
      const review = props.state.myReviews.find(
        (item) => item._id === props.state._id
      );
      const form = getFormOuterHtmlFromObject(review, configuration);

      // add a label to the form checkbox
      //const checkbox = form.querySelector("input[type='checkbox']");
      const checkbox = form.querySelector("#like"); // easier than previous css path
      const label = checkbox.previousElementSibling; // the previous element to the input (checkbox) is the label      label.htmlFor = "like";
      label.htmlFor = "like";
      label.innerText = "❤";
      // swap the label and checkbox input
      checkbox.parentElement.insertBefore(checkbox, label);

      form.addEventListener("submit", onSaveClick(props, configuration));
      updateGenericModal2("Votre revue attribuée du projet", form);
      showGenericModal();
    } else if (props.state.projectId) {
      // we are to deal with creation of a review
      const project = props.state.allReviews.find(
        (item) => item._id === props.state.projectId
      );
      const form = getFormOuterHtmlFromObject(project, configuration);

      // add a label to the form checkbox
      //const checkbox = form.querySelector("input[type='checkbox']");
      const checkbox = form.querySelector("#like"); // easier than previous css path
      const label = checkbox.previousElementSibling; // the previous element to the input (checkbox) is the label      label.htmlFor = "like";
      label.htmlFor = "like";
      label.innerText = "❤";
      // swap the label and checkbox input
      checkbox.parentElement.insertBefore(checkbox, label);

      form.addEventListener("submit", onSaveClick(props, configuration));
      updateGenericModal2("Votre revue volontaire du projet", form);
      showGenericModal();
    } else if (props.state.projectIdFromMyReview) {
      // deal with a modification of a performed review
      const review = props.state.myReviews.find(
        (item) => item._id === props.state.projectIdFromMyReview
      );
      // don't allow to update the like info if the current like status is set to true (we shall never be able to remove a like, only to add one)
      if (review.like)
        configuration.find((item) => item.dataKey === "like").disabled = true;

      const form = getFormOuterHtmlFromObject(review, configuration);

      // add a label to the form checkbox
      //const checkbox = form.querySelector("input[type='checkbox']");
      const checkbox = form.querySelector("#like"); // easier than previous css path
      const label = checkbox.previousElementSibling; // the previous element to the input (checkbox) is the label      label.htmlFor = "like";
      label.htmlFor = "like";
      label.innerText = "❤";
      // swap the label and checkbox input
      checkbox.parentElement.insertBefore(checkbox, label);

      form.addEventListener("submit", onSaveClick(props, configuration));
      updateGenericModal2("Modification de votre revue attribuée du projet", form);
      showGenericModal();
    }

    // props.renderDelayed => auto render was disabled
    //props.parentHtmlElement.appendChild(props.currentHtmlElement);
  } catch (err) {
    console.error("MyReviewForm::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

const onSaveClick = (props, configuration) => async (e) => {
  // send the new data to the api
  e.preventDefault();

  const data = getFormDataOnSubmit(configuration);

  try {
    let element;
    if (props.state._id) {
      // deal with the modification of a generated expected review
      element = await callAPI(
        "/api/reviews/" + props.state._id,
        "PATCH",
        props.state.user.token,
        data
      );
    } else if (props.state.projectId) {
      // deal with the creation of a free review
      element = await callAPI("/api/reviews/", "POST", props.state.user.token, {
        ...data,
        projectId: props.state.projectId,
      });
    } else if(props.state.projectIdFromMyReview){
      // deal with a modification of a performed review
      element = await callAPI(
        "/api/reviews/" + props.state.projectIdFromMyReview,
        "PATCH",
        props.state.user.token,
        data
      );
    }

    closeGenericModal();

    // if there was already to many like, the last one was not added => throw an error
    if (element.error) throw new Error(element.error);
    // ensure that no error is printed, reset it...
    else PrintError({ innerText: "" });

    // update the complete ReadMyReviewsPage : both the summary and the table shall be updated
    if (props.state._id || props.state.projectIdFromMyReview) ReadMyReviewsPage({ state: props.state });
    else if (props.state.projectId)
      if (!props.state.isDetailedReview)
        ReadAllReviewsPage({ state: props.state });
      else ReadReviewPage({ state: props.state });
  } catch (err) {
    closeGenericModal();
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
    // update the complete ReadMyReviewsPage : both the summary and the table shall be updated
    ReadMyReviewsPage({ state: props.state });
  }
};

export default GenericFunctionalComponent(MyReviewForm);
