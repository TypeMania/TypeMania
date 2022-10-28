//file imports
import Banner from "../Banner";
import PubNav from './PubNav'
import Footer from "../Footer";
import SongList from "../SongList";
import { MusicPlayerProvider } from "../../MusicPlayerContext";

//home component
const Home = () => {


    return ( 
        <MusicPlayerProvider>
            <div className="home">
                <PubNav/>
                <Banner/>
                <SongList/>
                <Footer/>
            </div>

        </MusicPlayerProvider> 
    );
}

export default Home;
