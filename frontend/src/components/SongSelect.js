import React, { useState, useEffect } from "react";
import SongList from "./SongList";
import Banner from "./Banner";
import Nav from "./Nav";
import { MusicPlayerProvider } from "../MusicPlayerContext";


const SongSelect = () => {
    return (  
        <MusicPlayerProvider>
            <div>   
                <Nav/>
                <Banner/>
                <SongList/>       
            </div>
        </MusicPlayerProvider>
        
    );
}

export default SongSelect;