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
      backgroundColor: "#7393B3",
      scene: {
          preload: preload,
          create: create,
          update: update
      }
    };
var follower;
var path;
var graphics;
var cursors;

    function preload (){
    }
    
    function create (){
      //keyboard input
      cursors = this.input.keyboard.createCursorKeys();

      //creates arrow
      var data = [ 0,20, 84,20, 84,0, 120,50, 84,100, 84,80, 0,80 ];
      var r2 = this.add.polygon(100, 200, data, 0x9966ff);
      r2.setStrokeStyle(4, 0xefc53f);

      data = [ 0,20, 84,20, 84,0, 120,50, 84,100, 84,80, 0,80 ];
      r2 = this.add.polygon(300, 200, data, 0x9966ff);
      r2.setStrokeStyle(4, 0xefc53f);

      data = [ 0,20, 84,20, 84,0, 120,50, 84,100, 84,80, 0,80 ];
      r2 = this.add.polygon(500, 200, data, 0x9966ff);
      r2.setStrokeStyle(4, 0xefc53f);

      data = [ 0,20, 84,20, 84,0, 120,50, 84,100, 84,80, 0,80 ];
      r2 = this.add.polygon(700, 200, data, 0x9966ff);
      r2.setStrokeStyle(4, 0xefc53f);

      data = [ 0,20, 84,20, 84,0, 120,50, 84,100, 84,80, 0,80 ];
      r2 = this.add.polygon(900, 200, data, 0xFF0000);
      r2.setStrokeStyle(4, 0xefc53f);


      //grid
      this.add.grid(800, 500, 2000, 250, 64, 64, 0x00b9f2).setAltFillStyle(0x016fce).setOutlineStyle();


      graphics = this.add.graphics();
      follower = { t: 1, vec: new Phaser.Math.Vector2() };
      var line1 = new Phaser.Curves.Line([ 50, 200, 950, 200 ]);
      path = this.add.path();

      // path = new Phaser.Curves.Path();
      path.add(line1);
      this.tweens.add({
          targets: follower,
          t: .09,
          ease: 'Linear',
          duration: 5000,
          loop: -1
      });

    }
    
    function update ()
    {
      
      graphics.clear();
      graphics.lineStyle();
  
      path.draw(graphics);
  
      path.getPoint(follower.t, follower.vec);
  
      graphics.fillStyle(0xFFCC00, 1);
      graphics.fillRect(follower.vec.x - 8, follower.vec.y - 30, 60, 60);

      //Block dissapears when a key is pressed
      if (this.input.keyboard.checkDown(cursors.left, 250))
      {
          graphics.x -= 1000;
      }
      else if (this.input.keyboard.checkDown(cursors.right, 250))
      {
          graphics.x += 1000;
      }
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


