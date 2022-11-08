//file imports
import List from "./List"
import React, { useState, useEffect } from "react"
import { getInitialData, genNextData } from "../data/index.js"
import LeaderboardIMG from '../assets/Leaderboard.png'
import useAuth from "../hooks/useAuth"



//leaderboard component
const Banner = (  ) => {


    //states used for leaderboard !!!!!!!!!!!need to be linked to actual database in the future
    const [data, setData] = useState(getInitialData());
    useEffect(() => {
      const timer = setInterval(() => setData(genNextData()), 1000); //refreshes leaderboard data
      return () => clearInterval(timer);
    }, []);


    //username state
    const {username} = useAuth()

    let content
    if (!username) { //not logged in
        content = <div className="banner">
                    <img src={LeaderboardIMG} alt="Leaderboard" className='leaderboardIMG'/> 
                    <List data={data}/> 
                    </div>
    } else {
        content = <div className="banner">
                    <h3 className="welcome">WELCOME BACK, {username}!</h3>
                    <img src={LeaderboardIMG} alt="Leaderboard" className='leaderboardIMG'/>
                    <List data={data} />
                    </div>
    }


    return content
}

export default Banner; 

