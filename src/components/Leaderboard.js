//leaderboard component

//file imports
import List from "./List";
import React, { useState, useEffect } from "react";
import { getInitialData, genNextData } from "../data/index.js";

const Leaderboard = () => {
    //states used for leaderboard
    const [data, setData] = useState(getInitialData());
    useEffect(() => {
      const timer = setInterval(() => setData(genNextData()), 1000); //refreshes leaderboard data
      return () => clearInterval(timer);
    }, []);

    //return to home page
    return (  
    <div className="leaderboard">
      <h4>Leaderboard</h4>
      <List data={data} />
    </div>
    );
}

export default Leaderboard;