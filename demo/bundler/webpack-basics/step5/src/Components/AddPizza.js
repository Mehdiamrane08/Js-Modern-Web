import { loadBasicElement } from "../utils/render";
import PrintError from "./PrintError";
import callAPI from "../utils/api";
const COMPONENT_NAME = "AddPizza";
const STORE_NAME = "user";

/**
 * @returns {HTMLFormElement} return the pizza form, , with an attached submit event listenner
 */
const AddPizza = (props, parentHtmlElement) => {
  const form = loadBasicElement(
    props,
    parentHtmlElement,
    "form",
    COMPONENT_NAME
  );

  if (props.isUpdated) {
    // in this specific case, clear the form and don't do anything more
    form.reset();
    return;
  }
  
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
  parentHtmlElement.appendChild(form);
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
    const pizza = await callAPI("/api/pizzas", "POST", user.token, {
      title: title.value,
      content: content.value,
    }); 
    console.log("pizza added", pizza);  
    // clear the form inputs ()  
    const form = document.querySelector("form");
    form.reset();
    
  } catch (error) {
    console.error("error:", error);
    PrintError({ innerText: error.toString() }, page);
    form.reset(); 
  }
};

export default AddPizza;
