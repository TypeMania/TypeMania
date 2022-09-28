import Phaser from 'phaser';
import React from 'react';
import logoImg from './assets/logo.png';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';


var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: {
      preload: preload,
      create: create,
      update: update
  }
};

var game = new Phaser.Game(config);

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

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);


