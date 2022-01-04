let page = document.querySelector("#page");

const ErrorPage = (errMessage) => {
  let errorPage = `<p>${errMessage}</p>
    `;
  let page = document.querySelector("#page");
  return (page.innerHTML = errorPage);
};

export default ErrorPage;
