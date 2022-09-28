//leaderboard component
import List from "./List";
import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { getInitialData, genNextData } from "../data/index.js";


const Leaderboard = () => {

    const [data, setData] = useState(getInitialData());
    useEffect(() => {
      const timer = setInterval(() => setData(genNextData()), 1000);
      return () => clearInterval(timer);
    }, []);

    return (  
     <div className="leaderboard">
        <h4>Leaderboard</h4>
        <List data={data} />
     </div>   
    );
}
 
export default Leaderboard;