
const stopStartSound = () => {
    const myAudioPlayer = document.querySelector("#audioPlayer");
    
    if( myAudioPlayer.paused)
        myAudioPlayer.play();
    else
        myAudioPlayer.pause();
}

const header = document.querySelector("header");

header.addEventListener("click",stopStartSound);