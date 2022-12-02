//import files
import Phaser from 'phaser';
import React, { Component } from 'react';
import { scroll_values } from './SpeedSlider';
import { randomizedCharacters, song_values } from './SongSelect';
//phaser game component

//react component (different syntax than other compoenents, but basically the same)
export default class Game extends Component {

  componentDidMount() {
    //constants
    const WIDTH = 1000;
    const HEIGHT = 600;

    const config = {
      default: 'arcade',
      arcade: {
        x:0,
        y:0,
        width:WIDTH,
        height:HEIGHT,
        fixedStep:true,
        fps:60,
      },
      type: Phaser.AUTO,
      parent: 'game-container',
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: "#7393B3",
      scene: {
          preload: preload,
          create: create,
          update: update
      },
      
    };

    const game = new Phaser.Game(config)
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
      this.add.grid(800, 500, 2000, 450, 64, 64, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();

      //scroll track
      scrolltrack = this.add.rectangle(0,HEIGHT/3,WIDTH*2,HEIGHT/4, 0x333333)
      scrolltrack.setStrokeStyle(4, 0x000000);

      //arrows
      for (let i=WIDTH/3; i<WIDTH; i+=WIDTH/4) {
        const data = [ 120,20, 60,20, 60,0, 0,50, 60,100, 60,80, 120,80 ];
        const r2 = this.add.polygon(i, HEIGHT/3, data, 0x9966ff);
        r2.setStrokeStyle(4, 0xefc53f);
      }

      //hitzone
      
      hitzone_animations = () => {
        hitzone_outer = this.add.rectangle(WIDTH/8,HEIGHT/3,100,100, 0xf54242);
        hitzone_outer.setStrokeStyle(4, 0x42adf5);
        hitzone_inner = this.add.rectangle(WIDTH/8,HEIGHT/3,60,60, 0xffbdf4).setStrokeStyle(3, 0x000000);
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
        
        const note = this.add.container(WIDTH+WIDTH/8,HEIGHT/3, [this.rectangle, this.Text]);
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
      noteArray.forEach((note)=>{note.destroy()});
      noteArray.length = 0;
    }
    
    function update ()
    {
      noteArray.forEach((note)=>{
        note.x -= scroll_values.note_scroll;
        if(note.x < -50){
          note.destroy();
          noteArray.shift();
        }
      });

      
    }
  }

  shouldComponentUpdate() {
    return false;
  }

  //sends div with game canvas to home component
  render() {
    return <div id='game-container' />   
  }

  
  
}