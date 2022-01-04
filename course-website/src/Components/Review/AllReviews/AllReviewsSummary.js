import callAPI from "../../../utils/api/fetch.js";
import { GenericFunctionalComponent } from "../../../utils/render.js";
import PrintError from "../../PrintError.js";

const CLASS_DESCRIPTION = "text-center";

const AllReviewsSummary = async (props) => {
  try {
    if (
      props.state.projectGroup.status === "init" ||
      props.state.projectGroup.status === "dev"
    )
      return;

    // deal with title
    const title = document.createElement("h6");
    title.innerText = "Résumé des revues de tous les projets";
    props.currentHtmlElement.appendChild(title);

    if (!props.state.allReviews) return;
    //props.state.myReviewSummary = myReviewSummary;
    const { allReviews } = props.state;
    let summary;
    if (allReviews.length > 0) summary = allReviews[0];
    else
      summary = {
        totalLikedReviews: 0,
        totalExpectedReviews: 0,
        totalPerformedReviews: 0,
      };

    //console.log("summary:", summary);

    const summaryTable = document.createElement("table");

    const line1 = document.createElement("tr");
    const heart = document.createElement("td");
    const embeddedHeart = document.createElement("i");
    embeddedHeart.className = "fas fa-heart fa-lg liked-review";
    heart.appendChild(embeddedHeart);
    const likeNumber = document.createElement("td");
    likeNumber.id = "likeNumber";
    likeNumber.className = "liked-review";
    likeNumber.innerText = summary.totalLikedReviews;
    const desc1 = document.createElement("td");
    if (summary.totalLikedReviews === 0)
      desc1.innerText = "Pas de coup de coeur donné";
    else if (summary.totalLikedReviews === 1)
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
    expectedReviews.innerText = summary.totalExpectedReviews;
    const desc2 = document.createElement("td");
    if (summary.totalExpectedReviews === 0)
      desc2.innerText = "Pas de revue en attente";
    else if (summary.totalExpectedReviews === 1)
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
    performedReviews.innerText = summary.totalPerformedReviews;
    const desc3 = document.createElement("td");
    if (summary.totalPerformedReviews === 0)
      desc3.innerText = "Pas de revue terminée";
    else if (summary.totalPerformedReviews === 1)
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

export default GenericFunctionalComponent(AllReviewsSummary);
