//Phaser game component
//still needs to be converted to a react component

import Phaser from 'phaser';
import logoImg from '.././assets/logo.png';


const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
  };
  
  const Game = new Phaser.Game(config);
  
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
  


export default Game;
