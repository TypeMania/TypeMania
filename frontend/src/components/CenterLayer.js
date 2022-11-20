import React from 'react';
import Banner from './Banner';
import Game from './Game';
import SongSelect from './SongSelect';
import SpeedSlider from './SpeedSlider';

const CenterLayer = () => {
    return (
        <div className='center-layer'>
            <SongSelect/>
            <Game/>
        </div>
    )
}

export default CenterLayer;