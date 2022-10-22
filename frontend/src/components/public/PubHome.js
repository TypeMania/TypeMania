//file imports
import Banner from "../Banner";
import Game from "../Game";
import PubNav from './PubNav'
import Footer from "../Footer";


//home component
const Home = () => {
    return (  
        <div className="home">
            <PubNav/>
            <Banner/>
            <Game/>
            <Footer/>
        </div>   
    );
}

export default Home;
