import React from 'react';
import Banner from './Banner';
import Game from './Game';
import SongSelect from './SongSelect';
import SpeedSlider from './SpeedSlider';
import StartMenu from './StartMenu';

const CenterLayer = () => {
    //used for start menu
    const [hidden, setHidden] = React.useState(false);
    return (
        <div className='center-layer'>
            <SongSelect hidden = {hidden} setHidden={setHidden}/>
            <StartMenu hidden = {hidden} setHidden={setHidden}/>
            <Game hidden = {hidden}/>
        </div>
    )
}

export default CenterLayer;