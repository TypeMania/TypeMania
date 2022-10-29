import { Box, Button, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import useMusicPlayer from "../hooks/useMusicPlayer";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlay, faPause} from "@fortawesome/free-solid-svg-icons";
//import Game from "./Game";

function SongList() {

    const {songsList, playMusic, isPlaying} = useMusicPlayer();
    const [currentSongmap, setCurrentSongmap] = useState(songsList[0]);
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    //const [visible, setVisible] = useState(false);
    /*const [isPlaying, setIsPlaying] = useState(false);*/

    function handlePlayMusic(songmap){

        setCurrentSongmap(songmap);
        playMusic(songmap);
    }

    /*<Tabs
                        value={currentSongmap}
                        onChange={handleChange}
                        orientation="vertical"
                        >
                            {songsList.map((songmap) =>
                                <Tab label={songmap.title} value={songmap}/>
                            )}
                        
                        </Tabs>*/
    

    
  
return (

    <div id="game-container">
            <Accordion
                defaultExpanded={false}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
            >
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
                >
                    <Typography>Song Select</Typography>
                </AccordionSummary>
                <AccordionDetails >
                <Box>
                    <Box sx={{ display: 'flex'}}>

                    <Tabs
                        orientation="vertical"
                        >
                        {songsList.map((songmap, index) => (
                            <div className="box">
                                <button className="button" onClick={() => handlePlayMusic(songmap)}>
                                    {currentSongmap.title === songmap.title && isPlaying ? <FontAwesomeIcon icon={faPause} /> : <FontAwesomeIcon icon={faPlay} />}
                                </button>
                                <div className="song-title">
                                    {songmap.title}
                                </div>
                            </div>
                        ))}
                        
                    </Tabs>
                             
                    <div>
                        <Box>
                            <Box>
                                <Typography>Artist: {currentSongmap.artist}</Typography>
                            </Box>
                            <Box>
                                <Typography>bpm: {currentSongmap.bpm}</Typography>
                            </Box>
                            <Box>
                                <Typography>length: {currentSongmap.length}</Typography>
                            </Box>
            
                        </Box>   
                    </div>
                        
                        </Box>
                    </Box>
                </AccordionDetails>
            </Accordion>    
        </div>


    

    
  );
}
export default SongList;
/*
<Button variant="outlined" onClick={handlePlayMusic}>Select</Button>*/
/*<Button onClick={handleChange("panel1")}>Select</Button>*/