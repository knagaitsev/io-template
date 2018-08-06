const Phaser = require('phaser');
const Game = require("./game.js");
require('./../css/main.css');

var config = {
    type: Phaser.AUTO,
    parent: 'phaser-example',
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: [Game]
};

var game = new Phaser.Game(config);

game.scene.start("Game");