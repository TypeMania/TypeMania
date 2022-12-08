//file import
import React from "react"

//home component
//states pulled in from centerlayer parent component
const StartMenu = ({hidden, setHidden, songSelected, songName}) => {
    //toggles to hide start menu (enable/disable display hiddent in css)
    function playGame() {
        setHidden(!hidden) //toggle startmenu visibility to hidden
    }
    //determines if song selected, enable/disable play button
    const canPlay = songSelected;

        return (  
            <div className={hidden ? "hidden" : "startmenu"}> 
                <p className={!canPlay ? "unselectedmessage" : "hidden"}>Welcome! <span className="highlight">Select a song</span> then click play to begin.</p>
                <p className={canPlay ? "selectedmessage" : "hidden"}>You selected the song, <span className="highlight">{songName}</span>. Click Play to begin!</p>
                <button 
                className="startbutton" 
                onClick={() => {playGame(); gameListener.listener(); gameListener.musicstarter(); }}
                disabled={!canPlay}
                >
                Play!
                </button>
            </div>   
        );
    }


//watches for the play button to alert game animations to reset in game component and music to restart in songselect component
export const gameListener = {
    //restarts game animations
    listener: () => { 
        return true;
    },
    musicstarter: () => {
        return true;
 }};

export default StartMenu;

