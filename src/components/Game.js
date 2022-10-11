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
var follower;
var path;
var graphics;
    function preload (){
    }
    
    function create (){
      graphics = this.add.graphics();
      follower = { t: 0, vec: new Phaser.Math.Vector2() };
      var line1 = new Phaser.Curves.Line([ 100, 100,900, 100 ]);
      path = this.add.path();

      // path = new Phaser.Curves.Path();
      path.add(line1);
      this.tweens.add({
          targets: follower,
          t: 0.9,
          ease: 'Linear',
          duration: 5000,
          yoyo: true,
          repeat: -1
      });

    }
    
    function update ()
    {
      graphics.clear();
      graphics.lineStyle(2, 0xffffff, 1);
  
      path.draw(graphics);
  
      path.getPoint(follower.t, follower.vec);
  
      graphics.fillStyle(0xFFCC00, 1);
      graphics.fillRect(follower.vec.x - 8, follower.vec.y - 30, 60, 60);
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


