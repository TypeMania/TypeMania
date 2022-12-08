import { createTheme, Slider} from "@mui/material";
import { createRef, useContext } from "react";
import { MusicPlayerContext } from "../MusicPlayerContext";

// BPM Override component
const SpeedSlider = () => {
    const [state, setState] = useContext(MusicPlayerContext);
    return (
    <div className='speed-slider'>
        <Slider
            ref={myself}
            defaultValue={1}
            min={0.5}
            max={1.5}
            step={0.1}
            valueLabelDisplay={"auto"}

            /* Modifies values in the object that communicates with Game.js */
            onChangeCommitted={()=>{
                scroll_values.applySpeed(parseFloat(myself.current.innerText));
                if (state?.audioPlayer) {
                    state.audioPlayer.playbackRate = scroll_values.note_scroll;
                }
            }}
        />
        <p id="speed-slider">BPM Override</p>
    </div>
    );
};

const myself = new createRef();

export const scroll_values = {
    note_scroll: 1,
    generation_time:1000,
    applySpeed: (multiplier) => {
        scroll_values.note_scroll = 1 * multiplier;
        scroll_values.generation_time = 1000 / multiplier;
    }
}

export default SpeedSlider;