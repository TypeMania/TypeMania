import React from 'react';
import Banner from './Banner';
import Game from './Game';
import SongSelect from './SongSelect';
import SpeedSlider from './SpeedSlider';
import StartMenu from './StartMenu';

const CenterLayer = () => {
    return (
        <div className='center-layer'>
            <SongSelect/>
            <StartMenu/>
            <Game/>
        </div>
    )
}

export default CenterLayer;