//file import




//handlePlayMusic(songmap)


//home component
const StartMenu = ({hidden, setHidden}) => {

    

    function playGame(e) {
        e.preventDefault();
        setHidden(!hidden)
        console.log('You clicked play.');
    }


        return (  
            <div className={hidden ? "hidden" : "startmenu"}>
                <button className="startbutton" onClick={playGame}>Click to Play!</button>
            </div>   
        );
    }


export default StartMenu;

