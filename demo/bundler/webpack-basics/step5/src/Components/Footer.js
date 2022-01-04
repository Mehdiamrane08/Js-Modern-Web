import { loadBasicElement } from "../utils/render";


/**
 * @param {*} props
 * @param {*} parentHtmlElement
 */
const COMPONENT_NAME = "Footer";

const Footer = (props, parentHtmlElement) => {
  // deals with loading either a new element
  // or the updated element based on the generic props (HTML attributes)
  const footerDiv = loadBasicElement(
    props,
    parentHtmlElement,
    "div",
    COMPONENT_NAME
  );

  if (props.isUpdated) return;  

  /*Deal with a potential text */
  let { h1 } = props;
  if (h1) {
    const footerText = document.createElement("h1");
    footerText.innerText = h1;
    footerDiv.appendChild(footerText);
  }
  
  /*Deal with a potential image */
  let { src, height } = props;
  if (src) {
    const footerPhoto = new Image();
    footerPhoto.src = src;
    if (height) footerPhoto.height = height;
    footerDiv.appendChild(footerPhoto);
  }

  parentHtmlElement.appendChild(footerDiv);
};

export default Footer;
