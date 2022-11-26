import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useMusicPlayer from "../hooks/useMusicPlayer";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";

const SongsList = () => {
    const [songs, setSong] = useState([]);
    useEffect(() => {
        getSongs();
      }, []);
     
      const getSongs = async () => {
        const response = await axios.get("http://localhost:3500/songs");
        setSong(response.data);
      };

    //states 
    const {playMusic} = useMusicPlayer();

    const [expanded, setExpanded] = useState(false);

    const handleChange =
        (panel) => (event , newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        };

    function handlePlayMusic(songmap){

        //setCurrentSongmap(songmap);
        playMusic(songmap);
    }


     
return (
    <div className="song-select">
        <Accordion defaultExpanded={false}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Song Select</Typography>
            </AccordionSummary>
            <AccordionDetails>

                {songs?.map((songmap, index) => (
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
    </div>   
  );
}
export default SongsList

/*function SongSelect() {

    //const {songsList, playMusic} = useMusicPlayer();
    const {playMusic} = useMusicPlayer();
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        getAllSongs();
      }, []);
     
    const getAllSongs = async () => {
        const response = await axios.get("http://localhost:3500/songs");
        setSongs(response.data);
    };
    //const [currenSongmap, setCurrentSongmap] = useState(songsList[0]);
    const [expanded, setExpanded] = useState(false);

    const handleChange =
        (panel) => (event , newExpanded) => {
        setExpanded(newExpanded ? panel : false);
        };
    
    //const [visible, setVisible] = useState(false);
    /*const [isPlaying, setIsPlaying] = useState(false);*/

    /*function handlePlayMusic(songmap){

        //setCurrentSongmap(songmap);
        playMusic(songmap);
    }*/
      
  
/*return (
    <div className="song-select">
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
        

</div>
            
    
  );
}
export default SongSelect;*/

