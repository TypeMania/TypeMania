//import files
import Phaser from 'phaser';
import React, { Component } from 'react';
import { scroll_values } from './SpeedSlider';

//phaser game component

//react component (different syntax than other compoenents, but basically the same)
export default class Game extends Component {
  componentDidMount() {
    //constants
    const WIDTH = 900;
    const HEIGHT = 600;

    const config = {
      type: Phaser.AUTO,
      parent: 'game-container',
      width: WIDTH,
      height: HEIGHT,
      scene: {
          preload: preload,
          create: create,
          update: update,
      }
    };

    let follower;
    let path;
    let graphics;
    let cursors;
    let hitzone_outer;
    let hitzone_inner;
    let note_animations;
    let hitzone_animations;
    let scrolltrack;

  
    function preload(){
      
    }
    
    function create () {
      
      //keyboard input
      cursors = this.input.keyboard.createCursorKeys();
      
      //grid
      this.add.grid(800, 500, 2000,1000, 30, 30, 0x9966ff).setAltFillStyle(0x270a3d).setOutlineStyle();

      //scroll track
      scrolltrack = this.add.rectangle(0,HEIGHT/3,WIDTH*3,HEIGHT/3, 0x00b9f2)
      scrolltrack.setStrokeStyle(4, 0x00b9f2);

      //arrows
      for (let i=WIDTH/3; i<WIDTH; i+=WIDTH/4) {
        const data = [ 120,20, 60,20, 60,0, 0,50, 60,100, 60,80, 120,80 ];
        const r2 = this.add.polygon(i, HEIGHT/3, data, 0x9966ff);
        r2.setStrokeStyle(4, 0xefc53f);
      }

      //hitzone
      
      hitzone_animations = () => {
        hitzone_outer = this.add.rectangle(WIDTH/8,HEIGHT/3,100,100, 0x270a3d);
        hitzone_outer.setStrokeStyle(7, 0xefc53f);
        hitzone_inner = this.add.rectangle(WIDTH/8,HEIGHT/3,60,60, 0x9966ff).setStrokeStyle(5, 0x00b9f2);
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
      
      
      
      note_animations = () => {  
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
            duration: scroll_values.note_scroll,
            loop: -1
        });}
      note_animations();

    }
    
    scroll_values.applySpeed = (multiplier) => {
      scroll_values.hitzone_pulse = 335 / multiplier;
      scroll_values.note_scroll = 5000 / multiplier;
      graphics.destroy();
      hitzone_outer.destroy();
      hitzone_animations();
      note_animations();
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