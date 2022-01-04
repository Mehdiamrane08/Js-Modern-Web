import callAPI from "../../../utils/api/fetch.js";
import { GenericFunctionalComponent } from "../../../utils/render.js";
import PrintError from "../../PrintError.js";

const CLASS_DESCRIPTION = "text-center";

const ProjectReviewSummary = async (props) => {
  try {
    if (
      props.state.projectGroup.status === "init" ||
      props.state.projectGroup.status === "dev"
    )
      return;

    // get the detailled review to be printed
    // we are to deal with creation of a review
    const detailedReview = props.state.allReviews.find(
      (item) => item._id === props.state.projectId
    );
    if (!detailedReview) return;
    
    // deal with title
    const title = document.createElement("h6");
    title.innerText = "Résumé des revues du projet";
    props.currentHtmlElement.appendChild(title);    

    

    const summaryTable = document.createElement("table");

    const line1 = document.createElement("tr");
    const heart = document.createElement("td");
    const embeddedHeart = document.createElement("i");
    embeddedHeart.className = "fas fa-heart fa-lg liked-review";
    heart.appendChild(embeddedHeart);
    const likeNumber = document.createElement("td");
    likeNumber.id = "likeNumber";
    likeNumber.className = "liked-review";
    likeNumber.innerText = detailedReview.countLiked;
    const desc1 = document.createElement("td");
    if (detailedReview.countLiked === 0)
      desc1.innerText = "Pas de coup de coeur donné";
    else if (detailedReview.countLiked === 1)
      desc1.innerText = "Coup de coeur donné";
    else desc1.innerText = "Tous les coups de coeurs donnés";   
    desc1.className = CLASS_DESCRIPTION;
    line1.appendChild(desc1);
    line1.appendChild(heart);
    line1.appendChild(likeNumber);
    summaryTable.appendChild(line1);

    const line2 = document.createElement("tr");
    const comment1 = document.createElement("td");
    const embeddedComment1 = document.createElement("i");
    embeddedComment1.className = "fas fa-comment fa-lg expected-review";
    comment1.appendChild(embeddedComment1);
    const expectedReviews = document.createElement("td");
    expectedReviews.id = "expectedReviews";
    expectedReviews.className = "expected-review";
    expectedReviews.innerText = detailedReview.countExpected;
    const desc2 = document.createElement("td");
    if (detailedReview.countExpected === 0)
      desc2.innerText = "Pas de revue en attente";
    else if (detailedReview.countExpected === 1)
      desc2.innerText = "Revue attendue";
    else desc2.innerText = "Toutes les revues attendues";   
    desc2.className = CLASS_DESCRIPTION;
    line2.appendChild(desc2);
    line2.appendChild(comment1);
    line2.appendChild(expectedReviews);
    summaryTable.appendChild(line2);

    const line3 = document.createElement("tr");
    const comment2 = document.createElement("td");
    const embeddedComment2 = document.createElement("i");
    embeddedComment2.className = "fas fa-comment fa-lg performed-review";
    comment2.appendChild(embeddedComment2);
    const performedReviews = document.createElement("td");
    performedReviews.id = "performedReviews";
    performedReviews.className = "performed-review";
    performedReviews.innerText = detailedReview.countReviews;
    const desc3 = document.createElement("td");
    if (detailedReview.countReviews === 0)
      desc3.innerText = "Pas de revue terminée";
    else if (detailedReview.countReviews === 1)
      desc3.innerText = "Revue terminée";
    else desc3.innerText = "Toutes les revues terminées";    
    desc3.className = CLASS_DESCRIPTION;
    line3.appendChild(desc3);
    line3.appendChild(comment2);
    line3.appendChild(performedReviews);

    summaryTable.appendChild(line3);

    props.currentHtmlElement.appendChild(summaryTable);
    
  } catch (err) {
    console.error("MyReviewSummaryPage::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

export default GenericFunctionalComponent(ProjectReviewSummary);
