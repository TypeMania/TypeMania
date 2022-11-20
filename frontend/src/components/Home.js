//file imports
import Banner from "./Banner";
import SongSelect from "./SongSelect";
import Nav from "./Nav";
import Footer from "./Footer";
import Game from "./Game";
import SpeedSlider from "./SpeedSlider";
import { MusicPlayerProvider } from "../MusicPlayerContext";
import StartMenu from "./StartMenu";



//home component
const Home = () => {
    return (  
        <MusicPlayerProvider>
            <div className="home">
                <Nav/>
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
