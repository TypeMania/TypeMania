//file imports
import Banner from "./Banner";
import SongSelect from "./SongSelect";
import Nav from "./Nav";
import Footer from "./Footer";
import Game from "./Game";
import SpeedSlider from "./SpeedSlider";
import { MusicPlayerProvider } from "../MusicPlayerContext";
import StartMenu from "./StartMenu";
import React, { useState } from 'react';




//home component
const Home = () => {
    //used for start menu
    const [hidden, setHidden] = React.useState(false);
    return (  
        <MusicPlayerProvider>
            <div className="home">
                <Nav/>
                <Banner/>
                <SongSelect hidden = {hidden} setHidden={setHidden}/>
                <Game/>
                <SpeedSlider/>
                <StartMenu hidden = {hidden} setHidden={setHidden}/>
                <Footer/>
        </div>
        </MusicPlayerProvider>
           
    );
}

export default Home;
