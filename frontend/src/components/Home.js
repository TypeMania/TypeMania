//file imports
import Banner from "./Banner";
import SongList from "./SongList";
import Nav from "./Nav";
import Footer from "./Footer";

import { MusicPlayerProvider } from "../MusicPlayerContext";



//home component
const Home = () => {
    return (  
        <MusicPlayerProvider>
            <div className="home">
                <Nav/>
                <Banner/>
                <SongList/>
                <Footer/>
        </div>
        </MusicPlayerProvider>
           
    );
}

export default Home;
