//file imports
import Nav from "./Nav";
import Footer from "./Footer";
import { MusicPlayerProvider } from "../MusicPlayerContext";
import React from 'react';
import CenterLayer from "./CenterLayer";
import WelcomeBack from "./WelcomeBack";



//home component
const Home = () => {
    return (  
        <MusicPlayerProvider>
            <div className="home">
                <Nav/>
                <WelcomeBack/>
                <CenterLayer/>
                <Footer/>
        </div>
        </MusicPlayerProvider>
           
    );
}

export default Home;
