//import files
import Phaser from 'phaser';
import logoImg from '.././assets/logo.png';
import React, { Component } from 'react';

//phaser game component

//react component (different syntax than other compoenents, but basically the same)
export default class Game extends Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: 1000,
      height: 600,
      scene: {
          preload: preload,
          create: create,
          update: update
      }
    }
    function preload (){
      this.load.image("logo", logoImg);
    }
    
    function create (){
      const logo = this.add.image(400, 150, "logo");
      this.tweens.add({
        targets: logo,
        y: 450,
        duration: 2000,
        ease: "Power2",
        yoyo: true,
        loop: -1
      });
    }
    
    function update ()
    {
    }
    
    //precondition: recieves a Songmap object. Songmap class must have a static constant property: INITIAL_ARRAY
    //postcondition: returns a shuffled array of integers [0-60)
    function seededPRNG({bpm, length, seed}){
      const totalPossibleKeyAmount = 128 // amount of playable characters on keyboard (subject to change)
      const arraySize = bpm * length / 60; // the array size is calculated from the speed and length of the song
      const start = seed % totalPossibleKeyAmount
      const stop = start + arraySize;
      const unshuffledArray = Songmap.INITIAL_ARRAY.slice(start,stop); // the larger static array is cut down to the previously calculated size
      
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
      
      return shuffle(unshuffledArray, seed); //the cut down array is uniformly shuffled x amount of times where x is the songmap's seed
    }
    
    new Phaser.Game(config)
  }

  shouldComponentUpdate() {
    return false;
  }

  //sends div with game canvas to home component
  render() {
    return <div id='game-container' />   
  }

  
  
}


