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
      //var chars = song_values.current_song_char;
      //console.log("characters length: " + chars.length)
      var counter = 0;
      setInterval(()=>{
        //const note = this.add.rectangle(WIDTH+WIDTH/8,HEIGHT/3,60,60, 0xFFFF00).setStrokeStyle(3, 0x000000);
        
        console.log("characters length: " + song_values.current_song_char.length)
        this.rectangle = this.add.rectangle(0,0,60,60, 0xFFFF00).setStrokeStyle(3, 0x000000);
        var textConfig = {fontSize:'20px', color:'black', fontFamily: 'Arial'};
        if (counter < song_values.current_song_char.length){
          this.Text = this.add.text(0, 0, song_values.current_song_char[counter], textConfig);
          counter = counter + 1;
        }
        else {
          counter = 0;
          this.Text = this.add.text(0, 0, song_values.current_song_char[counter], textConfig);
          counter = counter + 1;
        }
        
        const note = this.add.container(screen.width+screen.width/8,screen.height/3, [this.rectangle, this.Text]);
        Phaser.Display.Align.In.Center( this.Text, this.rectangle);
      

        // add characters to notes here
        //
        noteArray.push(note);
        console.log(noteArray.length);
        
        
      }, scroll_values.note_scroll*1000);

    }

    song_values.updateSong = (songmap) => {
      song_values.current_song_char = randomizedCharacters(songmap.bpm, songmap.length);
      console.log("updated chars length: " + song_values.current_song_char.length);
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
      });

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