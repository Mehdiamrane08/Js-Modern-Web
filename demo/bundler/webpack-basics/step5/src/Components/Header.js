import { loadBasicElement } from "../utils/render";
import music from "../sound/Infecticide-11-Pizza-Spinoza.mp3";
import { AnalogClock } from "customizable-analog-clock";
import Navigation from "./Navigation";
/**
 * @param {*} props
 * @param {*} parentHtmlElement
 */
const COMPONENT_NAME = "Header";

const Header = (props, parentHtmlElement) => {
  // deals with loading either a new element
  // or the updated element based on the generic props (HTML attributes)
  const headerDiv = loadBasicElement(
    props,
    parentHtmlElement,
    "div",
    COMPONENT_NAME
  );

  if (props.isUpdated) return;

  // Manage navigation
  Navigation({},headerDiv);

  // Start with a message in header
  /* WARNING THIS CANNOT BE DONE as it kills event attached priorily within
  parentHtmlElement, and kill event on Navigation !
  parentHtmlElement.innerHTML += ` <p>
  Because we love JS, you can also click on the header to stop / start the
  music ; )
</p>`;*/  
  

  // Create the audio and load the file via webpack file-loader
  const myPlayer = document.createElement("audio");
  myPlayer.id = "audioPlayer";
  myPlayer.controls = true;
  myPlayer.autoplay = true;
  myPlayer.src = music;
  headerDiv.appendChild(myPlayer);  
 

  // load an analog clock  
  headerDiv.appendChild(document.createElement("br"));
  headerDiv.appendChild(document.createElement("br"));
  const clockDiv = document.createElement("div");
  clockDiv.id = "my-clock";
  clockDiv.style = "width: 200px; height: 200px;";
  headerDiv.appendChild(clockDiv);

  // render the component
  parentHtmlElement.appendChild(headerDiv);
   
  const clock = new AnalogClock({
    htmlElement: "my-clock",
    showIndicators: true,
  });

  headerDiv.addEventListener("click", stopStartSound);
  
};

const stopStartSound = () => {
  const myAudioPlayer = document.querySelector("#audioPlayer");

  if (myAudioPlayer.paused) myAudioPlayer.play();
  else myAudioPlayer.pause();
};

export default Header;
