//file imports
import Banner from "./Banner";
import Game from "./Game";
import Nav from "./Nav";
import Footer from "./Footer";



//home component
const Home = () => {
    return (  
        <div className="home">
            <Nav/>
            <Banner/>
            <Game/>
            <Footer/>
        </div>   
    );
}

export default Home;
