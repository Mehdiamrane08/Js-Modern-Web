import callAPI from "../../../utils/api/fetch.js";
import { GenericFunctionalComponent } from "../../../utils/render.js";
import PrintError from "../../PrintError.js";
/**
 *
 * @param {Object} props
 * @return {Object} returns the review summary under this shape (this is an example) : {availableLike: -1, alreadyLiked: 2, alreadyReviewed: 3, expectedReviews: 2}
 */
const CLASS_DESCRIPTION = "text-center";

const MyReviewSummary = async (props) => {
  try {
    if (
      props.state.projectGroup.status === "init" ||
      props.state.projectGroup.status === "dev"
    )
      return;

    /*
    const myReviewSummary = await callAPI(
      `/api/reviews/users/${props.state.user.userName}/projectgroups/${props.state.projectGroup._id}/count`, //+ CURRENT_PROJECT_GROUP,
      "get",
      props.state.user.token,
      undefined
    );
    if (!myReviewSummary) return;
    props.state.myReviewSummary = myReviewSummary;

    */
    const myReviewSummary = props.state.myReviewSummary;
    if (!myReviewSummary) return;
    // deal with title
    const title = document.createElement("h6");
    title.innerText = "Résumé des mes revues";
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
    likeNumber.innerText = myReviewSummary.availableLike;
    const desc1 = document.createElement("td");
    if (myReviewSummary.availableLike === 0)
      desc1.innerText = "Plus de coup de coeur disponible";
    else if (myReviewSummary.availableLike === 1)
      desc1.innerText = "Mon coup de coeur disponible";
    else desc1.innerText = "Mes coups de coeur disponibles";
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
    expectedReviews.innerText = myReviewSummary.expectedReviews;
    const desc2 = document.createElement("td");
    if (myReviewSummary.expectedReviews === 0)
      desc2.innerText = "Pas de revue en attente";
    else if (myReviewSummary.expectedReviews === 1)
      desc2.innerText = "Ma revue attendue";
    else desc2.innerText = "Mes revues attendues";
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
    performedReviews.innerText = myReviewSummary.alreadyReviewed;
    const desc3 = document.createElement("td");
    if (myReviewSummary.alreadyReviewed === 0)
      desc3.innerText = "Pas de revue terminée";
    else if (myReviewSummary.alreadyReviewed === 1)
      desc3.innerText = "Ma revue terminée";
    else desc3.innerText = "Mes revues terminées";
    desc3.className = CLASS_DESCRIPTION;
    line3.appendChild(desc3);
    line3.appendChild(comment2);
    line3.appendChild(performedReviews);

    summaryTable.appendChild(line3);

    props.currentHtmlElement.appendChild(summaryTable);

    // props.renderDelayed => auto render was disabled
    props.parentHtmlElement.appendChild(props.currentHtmlElement);

    //return props.state;
  } catch (err) {
    console.error("MyReviewSummaryPage::Error:", err);
    if (err.message) PrintError({ innerText: err.message });
    else PrintError({ innerText: err.toString() });
  }
};

export default GenericFunctionalComponent(MyReviewSummary);
