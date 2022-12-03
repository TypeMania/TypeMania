//file imports
import React, { useState, useEffect } from "react"
import LeaderboardIMG from '../assets/Leaderboard.png'
import axios from "axios";
import Item from "./Item";


//leaderboard component
const Leaderboard = ( {songmap}) => { //pull from songselect mapped songmaps
  //set states
  const [stats, setStats] = useState([]);

  //setstate and upate leaderboard stats
  useEffect(() => {
      //using axios is an easier way to access the db that bypasses needed an api slice file found in the features folder
    const getStats = async () => {
      const response = await axios.get("http://localhost:3500/stats/songStats", {
        params: {
          songName: songmap.title}}) //required parameters for get request
      setStats(response.data);    
    };
    const timer = setInterval(() => getStats(), 30000); //refreshes leaderboard data every 30 seconds
    getStats(); //call function to get stats for mapped songmap from songselect component
    return () => clearInterval(timer); //return leaderboard refresh
  }, [songmap.title]);


    return (
    <div className="banner">
      <img src={LeaderboardIMG} alt="Leaderboard" className='leaderboardIMG'/> 
      <ul className="item-wrapper">
        {stats.map(row => ( 
          <Item row={row} key={row._id} />
        ))}
      </ul>
      </div>
    );
   
}

export default Leaderboard; 

