import { useContext } from 'react';
import { MusicPlayerContext } from "../MusicPlayerContext";

const useMusicPlayer = () => {
  const [state, setState] = useContext(MusicPlayerContext);

  function playMusic(songmap) {
    if (songmap === state.currentSongmap) {
      togglePlay();
    } else {
      state.audioPlayer.pause();
      state.audioPlayer = new Audio(songmap.file);
      state.audioPlayer.play();
      setState(state => ({ ...state, currentSongmap: songmap, isPlaying: true }));
    }
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
    togglePlay,
    //songsList: state.songs,
    isPlaying: state.isPlaying
  }
};

export default useMusicPlayer;