import { createTheme, dividerClasses, Slider, ThemeProvider } from "@mui/material";
import { createRef } from "react";

const SpeedSlider = () => {
    return (
    <div className='speed-slider'>
        <Slider
            ref={myself}
            defaultValue={1}
            min={0.5}
            max={1.5}
            step={0.1}
            valueLabelDisplay={"auto"}
            onChangeCommitted={()=>{scroll_values.applySpeed(parseFloat(myself.current.innerText));}}
        />
        <p id="speed-slider">BPM Override</p>
    </div>
    );
};

const myself = new createRef();
const theme = createTheme({
    components: {
        MuiSlider: {
            styleOverrides: {
                root: {
                    width: "15%",
                    top: "10px",
                    bottom: "80px",
                }
            }
        }
    }
});

export const scroll_values = {
    hitzone_pulse: 335,
    note_scroll: 1,
    applySpeed: (multiplier) => {
        scroll_values.hitzone_pulse = 335 / multiplier;
        scroll_values.note_scroll = 1 * multiplier;
    }
}

export default SpeedSlider;