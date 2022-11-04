//file imports
import Banner from "../Banner";
import Game from "../Game";
import PubNav from './PubNav'
import Footer from "../Footer";
import SpeedSlider from "../SpeedSlider";

//home component
const Home = () => {
    return (  
        <div className="home">
            <PubNav/>
            <Banner/>
            <Game/>
            <SpeedSlider/>
            <Footer/>
        </div>   
    );
}

export default Home;
