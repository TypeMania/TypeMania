//import files
import Phaser from 'phaser';
import React, { Component } from 'react';
import { scroll_values } from './SpeedSlider';
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
          update: update,
      }


    };

    const theGame = new Phaser.Game(config)

    let cursors;
    let hitzone_outer;
    let hitzone_inner;
    let hitzone_animations;
    let scrolltrack;
    let noteArray;

  
    function preload(){
      
    }
    
    function create () {
      //Score
      this.data.set('Score', 3000);
      var text = this.add.text(10, 440, '', { font: '35px Courier', fill: '#efc53f' });
      text.setText([
        'Score: ' + this.data.get('Score')
    ]);
      //Timing
      this.data.set('Timing', 3000);
      var text = this.add.text(10, 480, '', { font: '35px Courier', fill: '#efc53f' });
      text.setText([
        'Timing: ' + this.data.get('Timing')
    ]);
      //Combo
      this.data.set('Combo', 3000);
      var text = this.add.text(400, 450, '', { font: '65px Courier', fill: '#efc53f' });
      text.setText([
          'Combo: ' + this.data.get('Combo')
      ]);
      //keyboard input
      cursors = this.input.keyboard.createCursorKeys();
      
      //grid
      this.add.grid(500,50,1000,750, 30, 30, 0x9966ff).setAltFillStyle(0x270a3d).setOutlineStyle();

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
      setInterval(()=>{
        const note = this.add.rectangle(screen.width+screen.width/8,screen.height/3,60,60, 0xFFFF00).setStrokeStyle(3, 0x000000);

        // add characters to notes here

        noteArray.push(note);
      }, scroll_values.note_scroll*1000);

    } 
    
    scroll_values.applySpeed = (multiplier) => {
      scroll_values.hitzone_pulse = 335 / multiplier;
      scroll_values.note_scroll = 1 * multiplier;
      hitzone_outer.destroy();
      hitzone_animations();
    }

    //has animations restart when the play on start menu is pressed
    gameListener.listener = () => {
      if (this.props.hidden === false) {
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