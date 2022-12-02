import { Box, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import useMusicPlayer from "../hooks/useMusicPlayer";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from "axios";


function seededPRNG(bpm, length){
    const arraySize = Math.round(bpm * length / 60); // the array size is calculated from the speed and length of the song
    console.log("arraySize: " + arraySize)
    var seedArr = [];
    
    for (var i = 0; i < arraySize; i++) {
      seedArr.push(Math.random() * (127 - 0) + 0);
    }
    
    return seedArr;
    
}

export function randomizedCharacters(bpm, length){
    
    
    const seedArr = seededPRNG(bpm, length)
    const charArray = [];
    for (let i = 0; i < seedArr.length; i++) {
      const char = String.fromCharCode(seedArr[i]);
      charArray.push(char);
    }
    return charArray;
  }

export const song_values = {
    current_song_char: randomizedCharacters(145, 139),
    updateSong: (songmap) => {
        song_values.current_song_char = randomizedCharacters(songmap.bpm, songmap.length);
        console.log("current song char length: " + song_values.current_song_char.length);
    }
}


const SongsList = () => {
    const {playMusic} = useMusicPlayer();
    const [songs, setSong] = useState([]);
    //const [currentSongmap, setCurrentSongmap] = useState([]);
    useEffect(() => {
        getSongs();
      }, []);
     
      const getSongs = async () => {
        const response = await axios.get("http://localhost:3500/songs");
        setSong(response.data);
      };

    //states 
    
    const [expanded, setExpanded] = useState(false);

    const handleChange =
        (panel) => (event , newExpanded) => {
        console.log("newExpanded: " + newExpanded)
        setExpanded(newExpanded ? panel : false);
        };

    function handlePlayMusic(songmap){
        //setCurrentSongmap(songmap);
        song_values.updateSong(songmap);
        playMusic(songmap);

    }


     
return (
    <>
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
    </>
    
    );  
       
}
export default SongsList

//export const song_values = {
 //   currentSong
//}

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

