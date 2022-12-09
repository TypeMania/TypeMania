import { useContext } from 'react';
import { MusicPlayerContext } from "../MusicPlayerContext";

const useMusicPlayer = () => {
  //importing the state from MusicPlayerContext to keep track of state
  const [state, setState] = useContext(MusicPlayerContext);

  //function to play a song 
  function playMusic(songmap) {
    //if the same song is selected togglePlay is called
    if (songmap === state.currentSongmap) {
      togglePlay();
    }
    // else the player is paused the new selected song is played and state is updated.
     else {
      state.audioPlayer.pause();
      state.audioPlayer = new Audio(state.songFiles[songmap.index].file);
      state.audioPlayer.play();
      setState(state => ({ ...state, currentSongmap: songmap, isPlaying: true }));
    }
  }
  //restarts music when the play button is pushed on the start meny
  function restartMusic() {
    state.audioPlayer.currentTime = 0; //resets song to beginning
    state.audioPlayer.play(); //plays song at 0
  }

  //if a song selected is already playing, it pauses it, plays it otherwise.
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