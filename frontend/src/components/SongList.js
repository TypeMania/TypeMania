import { Box, Tab, Tabs, Typography } from '@mui/material';
import { useState } from 'react';
import useMusicPlayer from "../hooks/useMusicPlayer";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
//import Game from "./Game";

function SongList() {

    const {songsList, playMusic} = useMusicPlayer();
    const [currentSongmap, setCurrentSongmap] = useState(songsList[0]);
    //const [visible, setVisible] = useState(false);
    

    
    const handleChange = (event, songmap) => {
        setCurrentSongmap(songmap);
        //setVisible(visible);
        
      };

    function handlePlayMusic(){
        playMusic(currentSongmap);
    }
    

    
  
return (

    <div id="game-container">
            <Accordion>
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
                        value={currentSongmap}
                        onChange={handleChange}
                        orientation="vertical"
                        >
                            {songsList.map((songmap) =>
                                <Tab label={songmap.title} value={songmap} onClick={handlePlayMusic}/>
                            )}
                        
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