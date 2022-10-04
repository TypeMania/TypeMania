//home component

//home imports
import Leaderboard from "./Leaderboard";
import Game from "./Game";


const Home = () => {
    return (  
        <div className="home">
            <Leaderboard/>
            <Game/>
        </div>   
    );
}

export default Home;
