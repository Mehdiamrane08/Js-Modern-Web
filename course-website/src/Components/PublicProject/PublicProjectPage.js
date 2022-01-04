import {
  GenericFunctionalComponent,
  createOrUpdateBasicElement,
  setLayout,
} from "../../utils/render.js";
import PublicProjectTable from "./PublicProjectTable.js";
import PrintError from "../PrintError.js";
import callAPI from "../../utils/api/fetch.js";

const PublicProjectPage = async (props) => {
  try {
    // if it is an update, re-render the whole component component
    if (props.isUpdated) {
      props.currentHtmlElement.innerHTML = "";
    }

    // deal with state data, to make it available to other components
    if (!props.isUpdated) {
      const projectGroup = await callAPI(
        "/api/projectgroups/default/public", //+ CURRENT_PROJECT_GROUP,
        "get"
      );

      if (!projectGroup) return;

      props.state.projectGroup = projectGroup;
    }

    // get the data that shall be used
    const allProjects = await callAPI(
      `/api/projects/projectgroups/${props.state.projectGroup._id}/public`, //+ CURRENT_PROJECT_GROUP,
      "get"
    );
    // add the reviews to the state if necessary
    if (allProjects.length > 0) props.state.allProjects = allProjects;

    // template initialisation : MyReviewSummary is rendered at the top of the page div
    setLayout(`Vitrine de projets : ${props.state.projectGroup._id}`);

    // set the page template, the intro
    const introDiv = createOrUpdateBasicElement({
      parentHtmlElement: props.currentHtmlElement,
      componentName: "IntroDiv",
      innerHTML: `<p>Voici les projets qui ont été développés et rendus publics par les étudiants du bloc 2 en Informatique de gestion à Vinci.
      </p>`,
    });

    if (allProjects.length > 0)
      /* ReadAllReviewsTable is set into a div that has to be responsive*/
      await PublicProjectTable({
        state: props.state,
        parentHtmlElement: props.currentHtmlElement,
        renderDelayed: true,
        className: "table-responsive",
      });

    // initialisation of the Error component
    PrintError();
  } catch (err) {
    console.error("PublicProjectPage::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

export default GenericFunctionalComponent(PublicProjectPage);
