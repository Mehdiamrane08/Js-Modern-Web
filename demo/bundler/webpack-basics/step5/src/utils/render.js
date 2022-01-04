/**
 * Create & return a basic HTML element based on given props.
 * All valid properties for the given tagName are allocated to the returne HTML element.
 * @param {Object} props
 * @param {String} tagName
 * @returns {HTMLElement}
 */
const createBasicElement = (props, tagName, componentName) => {
  // deal with generic props, with all provided properties linked to an html attribute
  
  const htmlElement = document.createElement(tagName);

  for (const property in props) {
    // if the key is a valid attribute of the given htmlElement
    if (htmlElement[property] !== undefined)
      htmlElement[property] = props[property]; // allocate the value for the given key in props
  }
  // hide the caller (generally a functional component) within a data attribute
  if(props) props.isUpdated = false;  
  // hide the component name
  htmlElement.dataset.componentName = componentName;
  // add the component name as a class for CSS use
  htmlElement.classList.add(componentName.toLowerCase());
  return htmlElement;
};

/**
 * Update a basic HTML element based on given props.
 * All valid properties for the given tagName are allocated to the htmlElementToUpdate.
 * @param {Object} props
 * @param {String} htmlElementToUpdate
 */
const updateBasicElement = (props, htmlElementToUpdate) => {
  // deal with generic props, with all provided properties linked to an html attribute
  if(props) props.isUpdated = true;
  for (const property in props) {
    // if the key is a valid attribute of the given htmlElement
    if (htmlElementToUpdate[property] !== undefined){
      htmlElementToUpdate[property] = props[property]; // allocate the value for the given key in props
    }
  }  
  return htmlElementToUpdate;
};

/**
 * Returns an HTML Element based on the name of a functional Component
 * NB : usually, it is createBasicElement that hide the name of a funcional Component in an HTMLelement
 * @param {String} componentName
 * @returns {HTMLElement}
 */
const queryElement = (componentName) => {
  const cssSelector = `[data-component-name="${componentName}"]`;
  return document.querySelector(cssSelector);
};

/**
 * 
 * @param {*} id 
 * @param {*} componentName 
 */
const queryExistingElement = (id, componentName) => {
  // hide the caller (generally a functional component) within a data attribute
  let existingElement;
  if (!id) {
    existingElement = queryElement(componentName);
    return existingElement;
  }
  existingElement = document.getElementById(id);
  return existingElement;
};

/**
 *
 * @param {*} props
 * @param {*} parentHtmlElement
 * @param {*} tagName
 */
const loadBasicElement = (props, parentHtmlElement, tagName, componentName) => {
    const elementToBeUpdated = getElementToBeUpdated(props, componentName);
    if (elementToBeUpdated) {    
      // Update the HTML Element within the DOM
      updateBasicElement(props, elementToBeUpdated);
      return elementToBeUpdated;
    }
    // An HTML element cannot be created & added to the DOM if there is no given parentHtmlElement
    if(!parentHtmlElement)
      if(props) throw new Error("Please add a parentHtmlElement as argument to your functional element.");

    // create html Element and deals with generic props
    const htmlElement = createBasicElement(props, tagName, componentName);
    return htmlElement;   
};

/**
 * 
 * @param {*} props 
 * @param {*} componentName 
 * @returns {boolean}
 */
const isModification = (props, componentName) => {
  let id;
  //const { id =undefined } = props;
  if (props && props["id"]) id = props["id"];
  let element;
  element = queryExistingElement(id, componentName);
  if (!element) return false;
  // Check if there is a real id
  if (element.id !== undefined && element.id.length !== 0) {
    if (element.id === id) return true;
    else return false;
  } else return true;
};


/**
 * 
 * @param {*} props 
 * @param {*} componentName 
 * @returns {HTMLElement}
 */
const getElementToBeUpdated = (props, componentName) => {
    let id;
    //const { id =undefined } = props;
    if (props && props["id"]) id = props["id"];
    let element;
    element = queryExistingElement(id, componentName);
    if (!element) return ;
    // Check if there is a real id
    if (element.id !== undefined && element.id.length !== 0) {
      if (element.id === id) return element;
      else return ;
    } else return element;
  };


export {
  createBasicElement,
  updateBasicElement,
  queryExistingElement,
  loadBasicElement,
  isModification,
  getElementToBeUpdated
};
