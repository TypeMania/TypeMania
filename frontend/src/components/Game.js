//import files
import Phaser from 'phaser';
import React, { Component } from 'react';
import { scroll_values } from './SpeedSlider';
import { randomizedCharacters, song_values } from './SongSelect';
import { gameListener } from './StartMenu';


//phaser game component
//react component (different syntax than other compoenents, but basically the same)
export default class Game extends Component {

  componentDidMount() {
    // Responsive game window or setting it up to be in the future.
    const screen = {
      width: 900,
      get height() {return this.width/1.7},
    }

    const config = {
      default: 'arcade',
      type: Phaser.AUTO,
      parent: 'game-container',
      width: screen.width,
      height: screen.height,
      scene: {
          preload: preload,
          create: create,
          update: update
      },
      
    };

    const theGame = new Phaser.Game(config)

    let cursors;
    let hitzone_outer;
    let hitzone_inner;
    let hitzone_animations;
    let scrolltrack;
    let noteArray;
  

    function preload (){
  
    }

    
    
    function create () {

      //keyboard input
      cursors = this.input.keyboard.createCursorKeys();
      
      
      //grid
      this.add.grid(800, 500, 2000,1000, 30, 30, 0x9966ff).setAltFillStyle(0x270a3d).setOutlineStyle();

      //scroll track
      scrolltrack = this.add.rectangle(0,screen.height/3,screen.width*3,screen.height/3, 0x00b9f2)
      scrolltrack.setStrokeStyle(4, 0x00b9f2);

      //arrows
      for (let i=screen.width/3; i<screen.width; i+=screen.width/4) {
        const data = [ 120,20, 60,20, 60,0, 0,50, 60,100, 60,80, 120,80 ];
        const r2 = this.add.polygon(i, screen.height/3, data, 0x9966ff);
        r2.setStrokeStyle(4, 0xefc53f);
      }

      //hitzone
      
      hitzone_animations = () => {
        hitzone_outer = this.add.rectangle(screen.width/8,screen.height/3,100,100, 0x270a3d);
        hitzone_outer.setStrokeStyle(7, 0xefc53f);
        hitzone_inner = this.add.rectangle(screen.width/8,screen.height/3,60,60, 0x9966ff).setStrokeStyle(5, 0x00b9f2);
        this.tweens.add({
          targets: hitzone_outer,
          scale: 0.9,
          ease: Phaser.Math.Easing.Back.In,
          duration: scroll_values.hitzone_pulse,
          yoyo: true,
          loop: -1
        });
      }
      hitzone_animations();

      noteArray = [];
      //setting counter to use it as index to access the data from  song_values.current_song_char
      var counter = 0;
      setInterval(()=>{
        
        //setting up the retangle
        this.rectangle = this.add.rectangle(0,0,60,60, 0xFFFF00).setStrokeStyle(3, 0x000000);
        //setting up the text configuration
        var textConfig = {fontSize:'20px', color:'black', fontFamily: 'Arial'};
       
        //if counter is less than song_values.current_song_char length, then increment counter
        if (counter < song_values.current_song_char.length){
          //setting char value from array to this.Text
          this.Text = this.add.text(0, 0, song_values.current_song_char[counter], textConfig);

          counter = counter + 1;
        }
        else {
          //if counter is has reached the length of the song_values.current_song_char, then reset it zero.
          counter = 0;
          //setting char value from array to this.Text
          this.Text = this.add.text(0, 0,song_values.current_song_char[counter], textConfig);
          //incrementing counter
          counter = counter + 1;
        }
        
        //adding both the retangle and text to container
        const note = this.add.container(screen.width+screen.width/8,screen.height/3, [this.rectangle, this.Text]);
        //aligning the text in the center
        Phaser.Display.Align.In.Center( this.Text, this.rectangle);
     
        
        //pushing the note (cotainer) to noteArray
        noteArray.push(note);
        
      }, scroll_values.note_scroll*1000);

    }

    //updating song_values imported from SongSelect which contains the array of chars for the selected song.
    song_values.updateSong = (songmap) => {
      song_values.current_song_char = randomizedCharacters(songmap.bpm, songmap.length);
      
    }
    
    scroll_values.applySpeed = (multiplier) => {
      scroll_values.hitzone_pulse = 335 / multiplier;
      scroll_values.note_scroll = 1 * multiplier;
      hitzone_outer.destroy();
      hitzone_animations();
    }

    //has animations restart when the play on start menu is pressed
    gameListener.listener = () => {
      if (this.props.hidden === false) { //if the start menu is no longer hidden 
        //reset animations
        noteArray.forEach(e=>e.destroy());
        noteArray = [];
        hitzone_outer.destroy();
        hitzone_animations();
      };
    }
    
    function update ()
    {
      
      // Move each note left a little bit constantly.

      

      noteArray.forEach((note)=>{
        
        note.x -= scroll_values.note_scroll;

        if(note.x < -50){
          note.destroy();
          noteArray.shift();
        }

        //if note is near but outside the hitzone, destroy it on keypress
        if (note.x < 300){ 
          let keyPressed = "";
          this.input.keyboard.on('keydown', function(input) {
          keyPressed = input.key;
        
          // if the note or container text  mateches the key pressed, destroy that note.
          if (keyPressed === note.list[1]?.text && note.x > 160){
            note.destroy();

          }
          }, this)     
        }
      })

      
      // Destroy the note if the key is down.
      // Only works when the note before finally shifts as seen above.
      if (this.input.keyboard.checkDown(cursors.left)) {
        noteArray[0].destroy();
      }
      if (this.input.keyboard.checkDown(cursors.right)) {
        noteArray[0].destroy();
      }
    }
  }

  shouldComponentUpdate(prevProps) {
    if (prevProps.hidden !== this.props.hidden) {
      return true;
    }
    return false;
  }

  //sends div with game canvas to home component
  render() {

    return (
    <div id='game-container'/>
    )
  }

  
  
}