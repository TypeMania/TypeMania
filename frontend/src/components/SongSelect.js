import { Box, Typography } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useMusicPlayer from "../hooks/useMusicPlayer";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import Game from "./Game";

const SongSelect = () => {

//const {songsList, playMusic} = useMusicPlayer();
const {playMusic} = useMusicPlayer();
const [songs, setSong] = useState([]);
useEffect(() => {
    songs();
  }, []);
useEffect(() => {
    getAllSongs();
}, []);
 
const getAllSongs = async () => {
    const response = await axios.get("http://localhost:5000/songs");
    setSong(response.data);
};
//const [currentSongmap, setCurrentSongmap] = useState(songsList[0]);
const [expanded, setExpanded] = useState(false);

const handleChange =
    (panel) => (event , newExpanded) => {
    setExpanded(newExpanded ? panel : false);
    };

//const [visible, setVisible] = useState(false);
/*const [isPlaying, setIsPlaying] = useState(false);*/

function handlePlayMusic(songmap){

    //setCurrentSongmap(songmap);
    playMusic(songmap);
}


return (
    <div className="song-select">
    {/*   
        <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Song Select</Typography>
            </AccordionSummary>
            <AccordionDetails>

                {songs.map((songmap, index) => (
                    <Accordion expanded={expanded === songmap.title} onChange={handleChange(songmap.title)}>
                    <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <button className="button" onClick={() => handlePlayMusic(songmap)}>
                        {songmap.title}
                    </button>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Box>
                            <Box>
                                <Typography>Artist: {songmap.artist}</Typography>
                            </Box>
                            <Box>
                                <Typography>bpm: {songmap.bpm}</Typography>
                            </Box>
                            <Box>
                                <Typography>length: {songmap.length}</Typography>
                            </Box>
                    
                        </Box>
                    </AccordionDetails>
                    </Accordion>
                ))}

            </AccordionDetails>
        </Accordion>
        */}
    {/*
        <div className="song-select">
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
        
    */}
    </div>
            
    
  );
}



export default SongSelect;

