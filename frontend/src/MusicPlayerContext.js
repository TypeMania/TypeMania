import React, { useState } from 'react';
import LostChameleon from './assets/songfiles/LostChameleon.mp3';
import TheHipsta from './assets/songfiles/TheHipsta.mp3';
import Tobu from './assets/songfiles/Tobu.mp3';
import LostChameleonTrimmed from './assets/songfiles/LostChameleon-Trimmed.mp3';

const MusicPlayerContext = React.createContext([{}, () => { }]);

const MusicPlayerProvider = (props) => {
  const [state, setState] = useState({
    audioPlayer: new Audio(),
    songFiles: [
        {
          index: 0,
          file: LostChameleon,
        },
        {
          index: 1,
          file: TheHipsta
        },
        {
          index: 2,
          file: Tobu,
        },
        {
          index: 3,
          file: LostChameleonTrimmed,
        },
      ],
    currentSongmap: null,
    isPlaying: false,
  });
  return (
    <MusicPlayerContext.Provider value={[state, setState]}>
      {props.children}
    </MusicPlayerContext.Provider>
  );
};

export { MusicPlayerContext, MusicPlayerProvider };