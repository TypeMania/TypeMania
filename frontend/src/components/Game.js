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

    function playMusic(songmap) {
      var audio = new Audio(songmap.songFilePath)
      audio.play();
      
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


