import { loadBasicElement } from "../utils/render";

/**
 * Look to load an existing HTML element associated to this functional component
 * - based on the component name IF NO id is given in props
 * - ELSE based on the component name
 * If an element is found based on the id in props
 * - It shall be updated if the HTML element id equals the id in props
 * - Else, it is a creation of an HTML element (with new id)
 * If an element is found based on the component name (no id in props),
 * it's a creaton of an HTML element (with no id)
 * If no element is found (based on the id or the component name)
 * - It is a creation of an HTML element (only if parentHtmlElement is given)
 * - Else throw an error
 * @param {*} props
 * @param {*} parentHtmlElement
 */
const COMPONENT_NAME = "PrintError";

const PrintError = (props, parentHtmlElement) => {
  /*
  // deal with potential update requests
  const elementToBeUpdated = getElementToBeUpdated(props, "PrintError");
  if (elementToBeUpdated) {
    // deal with update of generic props
    updateBasicElement(props, elementToBeUpdated);
    return;
  }
  // create html Element and deals with generic props
  const htmlElement = createBasicElement(props, "p", "PrintError");
  
  */
  // deals with loading either a new element
  // or the updated element based on the generic props (HTML attributes)
  const htmlElement = loadBasicElement(
    props,
    parentHtmlElement,
    "p",
    COMPONENT_NAME
  );
  //if(isModification(props, COMPONENT_NAME))
  if (props.isUpdated) return;
  // deals with the new component specific props, if any...
  // render the component
  parentHtmlElement.appendChild(htmlElement);
};

export default PrintError;
