const STORE_NAME = "user";

/**
 * @returns {HTMLFormElement} return the pizza form, , with an attached submit event listenner
 */
const AddPizza = () => {
  const form = document.createElement("form");
  const title = document.createElement("input");
  title.type = "text";
  title.id = "title";
  title.required = true;
  const content = document.createElement("input");
  content.type = "text";
  content.id = "content"; 
  content.required = true;
  const submit = document.createElement("input");
  submit.value = "Add";
  submit.type = "submit";
  form.appendChild(title);
  form.appendChild(content);
  form.appendChild(submit);

  form.addEventListener("submit", onSubmit);
  return form;
};


const onSubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title");
  const content = document.getElementById("content");
  console.log("pizza", title.value, content.value);

  // we want to query a secure API => get username and token from localStorage
  let user = sessionStorage.getItem(STORE_NAME);
  if (!user) return;
  user = JSON.parse(user);

  console.log("retrieved user", user);

  try {
    const options = {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      body: JSON.stringify({
        title: title.value,
        content: content.value,
      }), // body data type must match "Content-Type" header
      headers: {
        "Content-Type": "application/json",
        "Authorization": user.token,
      },
    };

    const response = await fetch("/api/pizzas", options); // fetch return a promise => we wait for the response

    if (!response.ok) {
      // status code was not 200, error status code
      const error = await response.text(); // get the textual error message
      throw new Error(error);
    }
    const pizza = await response.json(); // json() returns a promise => we wait for the data
    console.log("pizza added", pizza);  
    // clear the form inputs ()  
    const form = document.querySelector("form");
    form.reset();
    
  } catch (error) {
    console.error("error:", error);
  }
};

export default AddPizza;
