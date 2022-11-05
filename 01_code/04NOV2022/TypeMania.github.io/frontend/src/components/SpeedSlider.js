import { createTheme, Slider, ThemeProvider } from "@mui/material";
import { createRef } from "react";
import Game from "./Game.js"

const SpeedSlider = () => {
    return (
    <ThemeProvider theme={theme}>
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
    </ThemeProvider>
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
                    '@media only screen and (max-width: 1575px)':{
                    },
                    '@media only screen and (max-width: 1300px)':{
                    },
                    '@media only screen and (max-width: 1100px)':{
                    }
                }
            }
        }
    }
});

export const scroll_values = {
    hitzone_pulse: 335,
    note_scroll: 5000,
    applySpeed: (multiplier) => {
        scroll_values.hitzone_pulse = 335 / multiplier;
        scroll_values.note_scroll = 5000 / multiplier;
    }
}

export function update_scroll_values() {

}

export default SpeedSlider;