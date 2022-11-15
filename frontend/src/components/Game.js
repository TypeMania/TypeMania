//import files
import Phaser from 'phaser';
import React, { Component } from 'react';
import { scroll_values } from './SpeedSlider';

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
      }
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
      setInterval(()=>{
        const note = this.add.rectangle(WIDTH+WIDTH/8,HEIGHT/3,60,60, 0xFFFF00).setStrokeStyle(3, 0x000000);

        // add characters to notes here

        noteArray.push(note);
      }, scroll_values.note_scroll*1000);

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

    //precondition: recieves an array of integer returned by seededPRNG function, and the value from songmap settings
    //postcondition: returns an array of randomized characters to go into graphic
    function randomizedCharacters(songmapSettings, seedArr){
      const charArray = [];
      for (let i = 0; i < seedArr.length; i++) {
        if (songmapSettings === "UPPER"){
          if (seedArr[i] >= 65 && seedArr[i] <= 90) {
            const char = String.fromCharCode(seedArr[i]);
            charArray.push(char);
          }
          else {
            const randomChar = String.fromCharCode(Math.floor(Math.random() * (90 - 65 + 1)) + 65);
            charArray.push(randomChar);
          }
      }
      else if (songmapSettings === "LOWER"){
        if (seedArr[i] >= 97 && seedArr[i] <= 122) {
          const char = String.fromCharCode(seedArr[i]);
          charArray.push(char);
        }
        else {
          const randomChar = String.fromCharCode(Math.floor(Math.random() * (122 - 97 + 1)) + 97);
          charArray.push(randomChar);
        }
      }
      else if (songmapSettings === "UPPER_LOWER_NUMERIC"){
        
        if ((seedArr[i] >= 65 && seedArr[i] <= 90) 
            || (seedArr[i] >= 97 && seedArr[i] <= 122) 
            || (seedArr[i] >= 49 && seedArr[i] <= 57)) {
              const char = String.fromCharCode(seedArr[i]);
              charArray.push(char);
        }
        else {
          const randomAsciiCode = [];
          const upperChar = Math.floor(Math.random() * (90 - 65 + 1)) + 65;
          randomAsciiCode.push(upperChar);
          const lowerChar = Math.floor(Math.random() * (122 - 97 + 1)) + 97;
          randomAsciiCode.push(lowerChar);
          const numChar = Math.floor(Math.random() * (57 - 49 + 1)) + 49;
          randomAsciiCode.push(numChar);
          const randomChar = String.fromCharCode(randomAsciiCode[Math.floor(Math.random() * randomAsciiCode.length)]);
          charArray.push(randomChar);
        }
      }
      else if (songmapSettings === "ALL_CHARS"){
        const char = String.fromCharCode(seedArr[i]);
        charArray.push(char);
      }
    }
    return charArray;
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