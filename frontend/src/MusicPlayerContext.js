import React, { useState } from 'react';
import LostChameleon from './assets/songfiles/LostChameleon.mp3';
import TheHipsta from './assets/songfiles/TheHipsta.mp3';
import Tobu from './assets/songfiles/Tobu.mp3';

const MusicPlayerContext = React.createContext([{}, () => {}]);

const MusicPlayerProvider = (props) => {
  const [state, setState] = useState({
    audioPlayer: new Audio(),
    songs: [
        {
          title: 'Genesis',
          artist: 'Lost Chameleon',
          bpm: 10,
          length: '02:20',
          seed: 'seed',
          songFilePath: '../assets/songfiles/LostChameleon.mp3',
          file: LostChameleon,
        },
        {
          title: 'Shaken Soda',
          artist: 'The Hipsta',
          bpm: 10,
          length: '03:15',
          seed: 'seed',
          songFilePath: '../assets/songfiles/TheHipsta.mp3',
          file: TheHipsta
        },
        {
          title: 'Such Fun',
          artist: 'TObu',
          bpm: 10,
          length: '03:08',
          seed: 'seed',
          songFilePath: '../assets/songfiles/Tobu.mp3',
          file: Tobu,
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