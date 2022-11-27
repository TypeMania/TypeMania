import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useMusicPlayer from "../hooks/useMusicPlayer";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SpeedSlider from './SpeedSlider';
import Banner from './Banner'
import axios from "axios";

const SongSelect = () => {
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
            <AccordionSummary key="sum1"
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography>Song Select</Typography>
            </AccordionSummary>
            <AccordionDetails key="det1">

                {songs?.map((songmap, index) => (
                    <Accordion expanded={expanded === songmap.title} onChange={handleChange(songmap.title)} key={"acc" + index}>
                    <AccordionSummary key="sum2"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    >
                    <button className="button" onClick={() => handlePlayMusic(songmap)}>
                        {songmap.title}
                    </button>
                    </AccordionSummary>
                    <AccordionDetails key="det2">
                        <Banner/>
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
            <SpeedSlider/>

        </Accordion>
        

    </div>
);} 
export default SongSelect;
    
    //const [visible, setVisible] = useState(false);
    /*const [isPlaying, setIsPlaying] = useState(false);*/

    /*function handlePlayMusic(songmap){

        //setCurrentSongmap(songmap);
        playMusic(songmap);*/
    
      
  
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
export default SongSelect;
*/

