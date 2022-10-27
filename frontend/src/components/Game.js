//import files
import Phaser from 'phaser';
import React, { Component } from 'react';

//phaser game component

//constants
const WIDTH = 1000;
const HEIGHT = 600;

//react component (different syntax than other compoenents, but basically the same)
export default class Game extends Component {
  componentDidMount() {
    const config = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: WIDTH,
      height: HEIGHT,
      backgroundColor: "#7393B3",
      scene: {
          preload: preload,
          create: create,
          update: update
      }
    };

let follower;
let path;
let graphics;
let cursors;
let hitzone;
let scrolltrack;

    function preload (){
    }
    
    function create (){
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
      hitzone = this.add.rectangle(WIDTH/8,HEIGHT/3,100,100, 0xf54242)
      hitzone.setStrokeStyle(4, 0x42adf5);
      this.add.rectangle(WIDTH/8,HEIGHT/3,60,60, 0xffbdf4).setStrokeStyle(3, 0x000000);
      this.tweens.add({
        targets: hitzone,
        scale: 0.9,
        ease: Phaser.Math.Easing.Back.In,
        duration: 335,
        yoyo: true,
        loop: -1
    });
      
      
      graphics = this.add.graphics();
      follower = { t: 1, vec: new Phaser.Math.Vector2() };
      let line1 = new Phaser.Curves.Line([ -HEIGHT/3, HEIGHT/3, WIDTH, HEIGHT/3 ]);
      path = this.add.path();

      // path = new Phaser.Curves.Path();
      path.add(line1);
      this.tweens.add({
          targets: follower,
          t: .1,
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
      if (this.input.keyboard.checkDown(cursors.left))
      {
          graphics.x -= 1000;
      }
      else if (this.input.keyboard.checkDown(cursors.right))
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