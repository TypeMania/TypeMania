//imports
import useAuth from "../hooks/useAuth"
import Nav from "./Nav";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import Footer from './Footer'
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';





//stats component
const Stats = () => {
    const { username } = useAuth()
    const [stats, setStats] = useState([]);
    

    //setstate
    useEffect(() => {
        getStats();
    }, []);

    //using axios is an easier way to access the db that bypasses needed an api slice file found in the features folder
    const getStats = async () => {
        console.log("inside udername " +username);
        const response = await axios.get("http://localhost:3500/stats", {
            params: {
              username: username}})
        console.log(response)
        setStats(response.data);
    };
    console.log(stats);



    return ( 
        <> 
        <Nav/>
            <div className="statsContainer">
                <h3 className="title">{username}'s Stats</h3>
                    {stats?.map((stat, index) => (
                    <>
                    <Accordion className="stats" defaultExpanded>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header">
                    <Typography className="header"><h3>{stat.createdAt.slice(5, 10)+"-"+stat.createdAt.slice(0, 4)}</h3><h3> {stat.song[0].title} - {stat.song[0].artist} </h3> </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                    <Typography className="items"><p>Score: {stat.score}</p><p>Accuracy: {stat.accuracy}%</p><p>Highest Combo: {stat.highCombo}</p></Typography>
                    </AccordionDetails>
                    </Accordion>
                    </>
                    ))};
                
                
            </div>  
            <Footer/>
        </> 
    )};
    



export default Stats;