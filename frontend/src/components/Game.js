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
      height: 500,
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


