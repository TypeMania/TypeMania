import React from 'react';
import Game from './Game';
import SongSelect from './SongSelect';
import StartMenu from './StartMenu';

// Holds the game scene, song select, & start menu.
const CenterLayer = () => {
    //states used for start menu
    const [hidden, setHidden] = React.useState(false); //toggle hide start menu
    const [songSelected, setSongSelected] = React.useState(false) //toggle songselection to disable/enable play button
    const [songName, setSongName] = React.useState("") //pass song title to start menu from ./songselect
    return (
        <div className='center-layer'>
            <SongSelect hidden = {hidden} setHidden={setHidden} songSelected = {songSelected} setSongSelected = {setSongSelected} songName = {songName} setSongName = {setSongName}/>
            <StartMenu hidden = {hidden} setHidden={setHidden} songSelected = {songSelected} setSongSelected = {setSongSelected} songName = {songName} setSongName = {setSongName}/>
            <Game hidden = {hidden}/>
        </div>
    )
}

export default CenterLayer;