//file import
import useMusicPlayer from "../hooks/useMusicPlayer";
import React, { useState } from 'react';

//home component
const StartMenu = () => {

const [hidden, setHidden] = React.useState(false);

function playGame(e) {
    e.preventDefault();
    setHidden(!hidden)
    console.log('You clicked play.');
  }


    return (  
        <div className={hidden ? "hidden" : "startmenu"}>
            <button className="startbutton" onClick={playGame}>Click to Play!</button>
        </div>   
    );
}

export default StartMenu;

