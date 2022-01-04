//const CODESANDBOX_OPTIONS = "fontsize=14&theme=dark&moduleview=1&codemirror=1";
const CODESANDBOX_OPTIONS = "&codemirror=1";
// It seems that "embed" cannot be edited
//const EMBEDED_SANDBOX_GLOBAL_URL ="https://codesandbox.io/embed/github/e-baron/js-modern-web-development/tree/master/?";
const EMBEDED_SANDBOX_GLOBAL_URL ="https://codesandbox.io/s/github/e-baron/js-modern-web-development/tree/master/?";
// Note than with the "s" version, the code can be edited via a forked sandbox. However, only one
// file can be automatically open in the editor

let sandboxUrl;
let fileToOpen;
let elementWithLink;

createEmbededSandboxUrl(EMBEDED_SANDBOX_GLOBAL_URL + CODESANDBOX_OPTIONS, "codesandbox");

/**
 * function which change all endpoint URL (or local URL, such as /demo/js-location/...) 
 * to external URL to an Embeded Codesandbox
 * This function applies to HTML components that contains those parameters :
 * - class={classContainingLocalUrl}
 * - href={localURL}
 * - src={localURL}
 * - data-associated-files={localURL of all files you want to see opened in the editor seperated by comma}
 * @param {embededGlobalUrl} URL to be used to access to an embedded Sandbox 
 * @param {classContainingLocalUrl}
 */
function createEmbededSandboxUrl(embededGlobalUrl,classContainingLocalUrl) {
  document.querySelectorAll("."+classContainingLocalUrl).forEach((sandboxButton) => {
    /** get the pathname from the element
     * NB : href provides the protocol with http://...
     */
    if("href" in sandboxButton)
      fileToOpen = sandboxButton.pathname;
    else
      fileToOpen = sandboxButton.getAttribute("src");
    
    console.log("path: " , fileToOpen);

    sandboxUrl =
      embededGlobalUrl + "&initialpath=" + fileToOpen + "&module=" + fileToOpen;

    /**
     * Check if there are multiple files associated to the link thanks to data attributes.
     * o get a data attribute through the dataset object, get the property by the part of the
     * attribute name after data- (note that dashes are converted to camelCase).
     * If there is an associated file, add to the files to be opened in the codesandbox editor
     */
    if ("associatedFiles" in sandboxButton.dataset)
      sandboxUrl += "," + sandboxButton.dataset.associatedFiles;
    if("href" in sandboxButton)
      sandboxButton.href = sandboxUrl;
    else
      sandboxButton.src = sandboxUrl;
  });
}
