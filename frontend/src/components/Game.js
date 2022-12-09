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
    let counter;
    let generation_id;
    let newInterval;

  
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
          duration: 335 / scroll_values.note_scroll,
          yoyo: true,
          loop: -1
        });
      }
      hitzone_animations();

      const game = this;
      noteArray = [];
      counter = 0;
      newInterval = () => {
        return setInterval(()=>{
          
          // While song is still playing...
          if (counter < song_values.current_song_char.length){
            console.log(counter + ' / ' + song_values.current_song_char.length);
            
            // Create notes and add characters to them.
            game.rectangle = game.add.rectangle(0,0,60,60, 0xFFFF00).setStrokeStyle(3, 0x000000);
            let textConfig = {fontSize:'20px', color:'black', fontFamily: 'Arial'};
            game.Text = game.add.text(0, 0, song_values.current_song_char[counter], textConfig);
            const note = game.add.container(screen.width+screen.width/8,screen.height/3, [game.rectangle, game.Text]);
            Phaser.Display.Align.In.Center( game.Text, game.rectangle);

            // Make the notes referencable so we can manimpulate & destroy them later.
            noteArray.push(note);
            
            // Recognize when the song is over and stop adding notes.
            counter++;
          }
          else {
            // Once the song ends stop the note generator.
            clearInterval(generation_id);


            // Pull up the ranking panel here.

          }
        
        // Generation rate relies on speed slider (and soon BPM) values.
        }, scroll_values.generation_time);
      }
      
      // Assign an identifier to the interval that generates notes.
      // Useful in resetting the generation rate. Allows new animation values from speed selection to be used.
      generation_id = newInterval();
      
      // BPM Override slider's onChange function. Modifies animation and music speed.
      scroll_values.applySpeed = (multiplier) => {
        
        // Adjust values for music playback, note scroll speed, and note generation interval.
        scroll_values.note_scroll = 1 * multiplier;
        scroll_values.generation_time = 1000 / multiplier;

        // Bring back start menu to clear all animated objects that were using the old values.
        scroll_values.resetMenu();

      }

     
    }

    song_values.updateSong = (songmap) => {
      song_values.current_song_char = randomizedCharacters(songmap.bpm, songmap.length);
      console.log("updated chars length: " + song_values.current_song_char.length);
    }
    
     //has animations restart when the play on start menu is pressed
     gameListener.listener = () => {
      if (this.props.hidden === false) { //if the start menu is no longer hidden 
        
        //reset animations
        noteArray.forEach(e=>e.destroy());
        noteArray = [];
        hitzone_outer.destroy();
        hitzone_animations();

        //reset counter
        counter = 0;
        clearInterval(generation_id);
        generation_id = newInterval();
      };
    }
    
    
    function update ()
    {
      // Move each note left a little bit constantly.
      noteArray.forEach((note)=>{
        note.x -= 1 * scroll_values.note_scroll;
        if(note.x < -50){
          note.destroy();
          noteArray.shift();
        }
      });

      // Destroy the note if the key is down.
      // Only works when the first note in the array finally shifts.
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