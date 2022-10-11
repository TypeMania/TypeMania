//import files
import Phaser from 'phaser';
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
    };
    function preload (){
      this.load.image('Key', 'Key.png');
    }
    
    function create (){
      var r1 = this.add.rectangle(200, 200, 148, 148, 0x6666ff);
      r1.animations.add('run');
      r1.animations.play('run', 15, true);
    }
    
    function update ()
    {
     
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


