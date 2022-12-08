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
    //gets username from authentication
    const { username } = useAuth()
    const [stats, setStats] = useState([]);
    
 
    //setstate - calls function
    useEffect(() => {
            //using axios is an easier way to access the db that bypasses needed an api slice file found in the features folder used for authorization and login
        const getStats = async () => {
            const response = await axios.get("http://localhost:3500/stats/stats", {
                params: {
                username: username}})
            setStats(response.data);
        };
        getStats();
    }, [username]);



    return ( 
        <> 
        <Nav/>
            <div className="statsContainer">
                <h3 className="title">{username}'s Stats</h3>
                    {stats?.map((stat, index) => (
                    <Accordion className="stats" key={"acc" + index} >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />} aria-controls="panel1a-content" id="panel1a-header" key="sum2">
                            <Typography className="statDate"component="h1" sx={{fontSize: '0.8em', fontWeight: 'bold'}}>{stat.createdAt.slice(5, 10)}-{stat.createdAt.slice(2, 4)}  </Typography>
                            <Typography className="statTitle" component="h1" sx={{fontSize: '1.3em', marginLeft: '15px'}}>{stat.song[0].title} by {stat.song[0].artist}</Typography>
                        </AccordionSummary>
                        <AccordionDetails key="det2">
                            <Typography className="items" component="p" >Score: {stat.score}</Typography>
                            <Typography className="items" component="p">Accuracy: {stat.accuracy}%</Typography>
                            <Typography className="items" component="p">Highest Combo: {stat.highCombo}</Typography>
                        </AccordionDetails>
                    </Accordion>
                    ))};
            </div>  
            <Footer/>
        </> 
    )};
    



export default Stats;