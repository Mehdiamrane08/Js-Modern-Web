import { RedirectUrl } from "../Router.js";
import { setLayout } from "../../utils/render.js";

let page = document.querySelector("#page");

const FilmListPage = () => {
  setLayout("List of films");

  fetch("/api/films")
    .then((response) => {
      if (!response.ok)
        throw new Error(
          "Error code : " + response.status + " : " + response.statusText
        );
      return response.json();
    })
    .then((data) => onFilmList(data))
    .catch((err) => onError(err));
};

const onFilmList = (data) => {
  if (!data) return;
  let table = `
  <div id="tableFilms" class="table-responsive mt-3">
  <table class="table">
      <thead>
          <tr>
              <th scope="col">Title</th>
              <th scope="col">Duration (min)</th>
              <th scope="col">Budget (million)</th>
          </tr>
      </thead>
      <tbody>`;

  data.forEach((element) => {
    table += `<tr>
                <td><a href="${element.link}" target="_blank">${element.title}</a></td>
                <td>${element.duration}</td>
                <td>${element.budget}</td>
            </tr>
            `;
  });

  table += `</tbody>
  </table>
  </div>`;
  return (page.innerHTML = table);
};

const onError = (err) => {
  console.error("UserListPage::onError:", err);
  let errorMessage = "Error";
  if (err.message) {
    if (err.message.includes("401"))
      errorMessage =
        "Unauthorized access to this ressource : you must first login.";
    else errorMessage = err.message;
  }
  RedirectUrl("/error", errorMessage);
};

export default FilmListPage;
