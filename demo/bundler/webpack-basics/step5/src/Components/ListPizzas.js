import { loadBasicElement } from "../utils/render";
import PrintError from "./PrintError";
import callAPI from "../utils/api";
const COMPONENT_NAME = "ListPizzas";

const ListPizzas = async (props, parentHtmlElement) => {
  try {
    
    const pizzas = await callAPI("/api/pizzas"); 
    // create an HTMLTableElement dynamically, based on the pizzas data (Array of Objects)
    // deals with loading either a new element
    // or the updated element based on the generic props (HTML attributes)
    const table = loadBasicElement(
      props,
      parentHtmlElement,
      "table",
      COMPONENT_NAME
    );

    if (props.isUpdated) // in this specific case, clear the table to re-render with new data;
      table.innerHTML = "";

    // deal with header
    const header = document.createElement("tr");
    const header1 = document.createElement("th");
    header1.innerText = "Pizza";
    const header2 = document.createElement("th");
    header2.innerText = "Description";
    header.appendChild(header1);
    header.appendChild(header2);
    table.appendChild(header);
    // deal with data rows
    pizzas.forEach((pizza) => {
      const line = document.createElement("tr");
      const titleCell = document.createElement("td");
      titleCell.innerText = pizza.title;
      line.appendChild(titleCell);
      const descriptionCell = document.createElement("tr");
      descriptionCell.innerText = pizza.content;
      line.appendChild(descriptionCell);
      // hide info within each row, the pizza id
      line.dataset.pizzaId = pizza.id;
      table.appendChild(line);
    });
    // add the HTMLTableElement to the main, within the #page div
    parentHtmlElement.appendChild(table);
  } catch (error) {
    console.error("error:", error);
    PrintError({innerText:error.toString()}, page);
  }
};

export default ListPizzas;
