//file imports
import List from "./List"
import React, { useState, useEffect } from "react"
import { getInitialData, genNextData } from "../data/index.js"
import LeaderboardIMG from '../assets/Leaderboard.png'



//leaderboard component
const Banner = (  ) => {
    //states used for leaderboard !!!!!!!!!!!need to be linked to actual database in the future
    const [data, setData] = useState(getInitialData());
    useEffect(() => {
      const timer = setInterval(() => setData(genNextData()), 1000); //refreshes leaderboard data
      return () => clearInterval(timer);
    }, []); 

    return (
    <div className="banner">
      <img src={LeaderboardIMG} alt="Leaderboard" className='leaderboardIMG'/> 
      <List data={data}/> 
    </div>)
}

export default Banner; 

