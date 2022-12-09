import { useContext } from 'react';
import { MusicPlayerContext } from "../MusicPlayerContext";
import { scroll_values } from '../components/SpeedSlider.js';

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  function playMusic(songmap) {
    if (songmap === state.currentSongmap) {
      togglePlay();
    } else {
      state.audioPlayer.pause();
      //state.audioPlayer = new Audio(songmap.songFilePath);
      state.audioPlayer = new Audio(state.songFiles[songmap.index].file);
      state.audioPlayer.playbackRate = scroll_values.note_scroll;
      state.audioPlayer.play();
      setState(state => ({ ...state, currentSongmap: songmap, isPlaying: true }));
    }
  }
  //restarts music when the play button is pushed on the start meny
  function restartMusic() {
    state.audioPlayer.playbackRate = scroll_values.note_scroll;
    state.audioPlayer.currentTime = 0; //resets song to beginning
    state.audioPlayer.play(); //plays song at 0
  }

  function togglePlay() {
    if (state.isPlaying) {
      state.audioPlayer.pause();
    } else {
      state.audioPlayer.play();
    }
    setState(state => ({ ...state, isPlaying: !state.isPlaying }));
  }

  

  return {
    playMusic,
    restartMusic,
    togglePlay,
    songFiles: state.songFiles,
    isPlaying: state.isPlaying,
    currentSongmap: state.currentSongmap
  }
};

export default useMusicPlayer;