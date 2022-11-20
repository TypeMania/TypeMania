//file imports
import Banner from "../Banner";
import PubNav from './PubNav'
import Footer from "../Footer";
import SpeedSlider from "../SpeedSlider";
import SongSelect from "../SongSelect";
import Game from "../Game";
import { MusicPlayerProvider } from "../../MusicPlayerContext";
import StartMenu from "../StartMenu";
import React, { useState } from 'react';



//home component
const Home = () => {
    //used for start menu
    const [hidden, setHidden] = React.useState(false);

    return ( 
        <MusicPlayerProvider>
            
            <div className="home">
                <PubNav/>
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
