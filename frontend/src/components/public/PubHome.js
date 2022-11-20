//file imports
import Banner from "../Banner";
import PubNav from './PubNav'
import Footer from "../Footer";
import SpeedSlider from "../SpeedSlider";
import SongSelect from "../SongSelect";
import Game from "../Game";
import { MusicPlayerProvider } from "../../MusicPlayerContext";
import StartMenu from "../StartMenu";


//home component
const Home = () => {


    return ( 
        <MusicPlayerProvider>
            
            <div className="home">
                <PubNav/>
                <Banner/>
                <SongSelect/>
                <Game/>
                <SpeedSlider/>
                <StartMenu/>
                <Footer/>
            </div>

        </MusicPlayerProvider> 
    );
}

export default Home;
