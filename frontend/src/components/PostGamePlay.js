//file import
import React, { Component } from "react"
import { shouldForwardProp } from "@mui/styled-engine";
import Nav from "./Nav";

const Stats = () => {

    function playGame() {
        setHidden(!hidden)
    }



        return (  
            <div className="stats">
            <Nav/>
            <h1>Statistics</h1>
            <div className="statsdata">
                <p>User statistics will go here</p>
            </div>
         </div>     
        );
    }
 
export default Stats;