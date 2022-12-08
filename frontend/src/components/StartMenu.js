//file import
import React, { Component } from "react"
import { shouldForwardProp } from "@mui/styled-engine";




//handlePlayMusic(songmap)


//home component
const StartMenu = ({hidden, setHidden}) => {

    

    function playGame() {
        setHidden(!hidden)
    }



        return (  
            <div className={hidden ? "hidden" : "startmenu"}>
                <button className="startbutton" onClick={() => {playGame(); gameListener.listener();}}>Click to Play!</button>
            </div>   
        );
    }


    //watches for the play button to alert game animations to reset
    export const gameListener = {
        listener: () => { 
            console.log("play button clicked");
            return true;
        }
    };

export default StartMenu;

