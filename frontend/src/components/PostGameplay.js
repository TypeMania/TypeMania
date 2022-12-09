//file import
import React, { Component } from "react"
import { shouldForwardProp } from "@mui/styled-engine";
import Nav from "./Nav";

const PostGameplay = ({hidden, setHidden, rankPanel, setPanel}) => {

    return (  
            <div className={rankPanel ? "postgameplay" : "hidden"}>
                <h1>Performance</h1>
                <div>
                    <p id='score'></p>
                    <p id='combo'></p>
                    <p id='accuracy'></p>
                </div>
                <button 
                    className="postbutton"
                    onClick={()=>{setPanel(false); setHidden(false)}}
                >Continue</button>
            </div>   
    );
}

export const rankListener = {
    //restarts game animations
    listener: () => { 
        return true;
    }
};
 
export default PostGameplay;