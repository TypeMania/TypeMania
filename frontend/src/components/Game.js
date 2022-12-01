//import files
import Phaser from 'phaser';
import React, { Component } from 'react';
import { scroll_values } from './SpeedSlider';
import SongValues from './SongSelect';




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
      const characters = randomizedCharacters();
      console.log("characters length: " + characters.length)
      var counter = 0;
      setInterval(()=>{
        //const note = this.add.rectangle(WIDTH+WIDTH/8,HEIGHT/3,60,60, 0xFFFF00).setStrokeStyle(3, 0x000000);
        
        
        this.rectangle = this.add.rectangle(0,0,60,60, 0xFFFF00).setStrokeStyle(3, 0x000000);
        var textConfig = {fontSize:'20px', color:'black', fontFamily: 'Arial'};
        if (counter < characters.length){
          this.Text = this.add.text(0, 0, characters[counter], textConfig);
          counter = counter + 1;
        }
        else {
          counter = 0;
          this.Text = this.add.text(0, 0, characters[counter], textConfig);
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

    

    //precondition: recieves a Songmap object. Songmap class must have a static constant property: INITIAL_ARRAY
    //postcondition: returns a shuffled array of integers [0-60)
    /*function seededPRNG({INITIAL_ARRAY, bpm, length, seed}){
      const totalPossibleKeyAmount = 128 // amount of playable characters on keyboard (subject to change)
      const arraySize = Math.round(bpm * length / 60); // the array size is calculated from the speed and length of the song
      console.log("arraySize: " + arraySize)
      const start = seed % totalPossibleKeyAmount
      console.log("start: " + start)
      const stop = start + arraySize;
      console.log("stop: " + stop)
      //const unshuffledArray = Songmap.INITIAL_ARRAY.slice(start,stop); // the larger static array is cut down to the previously calculated size
      const unshuffledArray = INITIAL_ARRAY.slice(start,stop); // the larger static array is cut down to the previously calculated size
      
      //helper function: recursive shuffling algorithm without randomness.
      //precondition: recieves an array and integer
      //postcondition: returns the shuffled array
      function shuffle(arr, shuffleCount){
          if(shuffleCount <= 0){ // recursion exit condition
              return arr;
          }
          else {
              const normalizedSeed = shuffleCount % totalPossibleKeyAmount;
              const half = Math.floor(normalizedSeed/2);
              arr = arr.reverse(); //pointless reverse that may even lessen the impact the below swaps
              //not really well thought out swapping loop of slightly offset left traversing and right traversing indices
              for (let [i,j] = [normalizedSeed,arr.length-normalizedSeed]; i<arr.length/2 & j>=arr.length/2; i+=(normalizedSeed-half),j-=(normalizedSeed+half)){
                  [arr[i], arr[j]] = [arr[j], arr[i]];
              }
              return shuffle(arr,shuffleCount-1); //recursion continuation statement
          }
      }

      console.log("unshuffledArray length: " + unshuffledArray.length)
      
      return shuffle(unshuffledArray, seed); //the cut down array is uniformly shuffled x amount of times where x is the songmap's seed
    }*/

    function seededPRNG({bpm, length, seed}){
      const totalPossibleKeyAmount = 128 // amount of playable characters on keyboard (subject to change)
      const arraySize = Math.round(bpm * length / 60); // the array size is calculated from the speed and length of the song
      console.log("arraySize: " + arraySize)
      var seedArr = [];
      
      for (var i = 0; i < arraySize; i++) {
        seedArr.push(Math.random() * (127 - 0) + 0);
        //Do something
      }
      
      return seedArr;
      
    }


    //precondition: recieves an array of integer returned by seededPRNG function, and the value from songmap settings
    //postcondition: returns an array of randomized characters to go into graphic
    /*function randomizedCharacters(songmapSettings, seedArr){
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
  }*/
  
  var INITIAL_ARRAY = [];
  function randomizedCharacters(){
    const currentSong = SongValues.currentSong;

    
    console.log("currentSong: " + currentSong);
    //let bpm = currentSong.bpm;
    //let length = currentSong.length;
    //let seed = currentSong.seed;
    let bpm = 145;
    let length = 139;
    let seed = 1;
    const seedArr = seededPRNG({INITIAL_ARRAY, bpm, length, seed})
    console.log("seedArr length: " + seedArr.length)
    const charArray = [];
    for (let i = 0; i < seedArr.length; i++) {
      const char = String.fromCharCode(seedArr[i]);
      charArray.push(char);
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