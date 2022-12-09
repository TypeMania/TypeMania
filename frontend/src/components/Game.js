//import files
import Phaser from 'phaser';
import React, { Component } from 'react';
import { scroll_values } from './SpeedSlider';
import { randomizedCharacters, song_values } from './SongSelect';
import { gameListener } from './StartMenu';
import { rankListener } from './PostGameplay';


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
    let scoreText;
    let accText;
    let comboText;
    let game;
    let bestCombo;
    let resetData;
    let totalHits;

    function preload (){
  
    }

    
    
    function create () {
      game = this;
      resetData = () => {
        noteArray = [];
        counter=0;
        bestCombo = 0;
        totalHits = 0;

        // If score/combo/acc already initialized then update.
        if (scoreText !== undefined) {
          updateText('Score', 0);
          updateText('Combo', 0);
          updateText('Accuracy',100);

        // Otherwise create the initial data.
        } else {

          //Score
          scoreText = game.add.text(10, 440, '', { font: '35px Courier', fill: '#efc53f' });
          game.data.set('Score', 0);
          scoreText.setText([
            'Score: ' + game.data.get('Score')
          ]);

          //Accuracy
          accText = game.add.text(10, 480, '', { font: '35px Courier', fill: '#efc53f' });
          game.data.set('Accuracy', 100);
          accText.setText([
            'Accuracy: ' + game.data.get('Accuracy') + '%',
          ]);

          //Combo
          comboText = game.add.text(400, 450, '', { font: '65px Courier', fill: '#efc53f' });
          game.data.set('Combo', 0);
          comboText.setText([
              'Combo: ' + game.data.get('Combo')
          ]);
        }

        
      }
      resetData();

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

      newInterval = () => {
        return setInterval(()=>{
          
          // While song is still playing...
          if (counter < song_values.current_song_char.length){
            
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
            // Pull up the ranking panel when the song ends.
            rankListener.listener();
            

            // Stop the note generator.
            clearInterval(generation_id);


            
          }
        
        // Generation rate relies on speed slider (and soon BPM) values.
        }, scroll_values.generation_time);
      }
      
      // Assign an identifier to the interval that generates notes.
      // Useful in resetting the generation rate. Allows new animation values from speed selection to be used.
      
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
    }
    
     //has animations restart when the play on start menu is pressed
     gameListener.listener = () => {
      if (this.props.hidden === false) { //if the start menu is no longer hidden 
        
        //reset animations
        noteArray.forEach(e=>e.destroy());
        hitzone_outer.destroy();
        hitzone_animations();

        //reset score/acc/combo
        resetData();

        //reset note generation 
        clearInterval(generation_id);
        generation_id = newInterval();
      }
    }
    
    // Bring up ranking panel after song finishes.
    rankListener.listener = () => {
      const score = game.data.get('Score');
      const combo = bestCombo;
      const accuracy = game.data.get('Accuracy');
      setTimeout(()=>this.props.setPanel(true),5000);
      document.getElementById('score').textContent = 'Score: ' + score;
      document.getElementById('combo').textContent = 'Highest Combo: ' + combo;
      document.getElementById('accuracy').textContent = 'Accuracy: ' + accuracy + '%';
    } 
    
    function updateText(text, value){
      switch(text){
        case 'Combo':
          game.data.set('Combo', value);
          comboText.setText([
            'Combo: ' + game.data.get('Combo')
          ]);
          break;
        case 'Score':
          game.data.set('Score', value);
          scoreText.setText([
            'Score: ' + game.data.get('Score')
          ]);
          break;
        case 'Accuracy':
          game.data.set('Accuracy', value);
          accText.setText([
          'Accuracy: ' + game.data.get('Accuracy') + '%',
          ]);
          break;
        default:;
      }
    }
    function update ()
    {
      noteArray.forEach((note)=>{
        // Move each note left a little bit constantly.
        note.x -= scroll_values.note_scroll;

        // Update data and destroy notes when they go off screen.
        if(note.x < -50){
          updateText('Combo',0);
          updateText('Accuracy', (100*(totalHits/(counter-noteArray.length))).toFixed(2));
          note.destroy();
          noteArray.shift();
        }

        if (note.x < 300 ){
          let keyPressed = "";
          this.input.keyboard.on('keydown', function(input) {
            keyPressed = input.key;
            
            if (keyPressed === note.list[1]?.text){

              // Update score/combo/acc on successful keypress.
              updateText('Combo',game.data.get('Combo')+1);
              updateText('Score',game.data.get('Score')+game.data.get('Combo'));
              updateText('Accuracy', (100*(totalHits++/(counter-noteArray.length))).toFixed(2));

              if(game.data.get('Combo') > bestCombo){
                bestCombo = game.data.get('Combo');
              }

              note.destroy();
              noteArray.shift();
            }
        
          }, this)
        }
      })
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