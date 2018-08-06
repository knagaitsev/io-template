const Phaser = require('phaser');
const Colyseus = require('colyseus.js');
const clone = require('clone');

const gameConfig = require('./../../config.json');

const endpoint = (window.location.hostname === "localhost")
  ? `ws://localhost:${gameConfig.serverDevPort}` // development (local)
  : `${window.location.protocol.replace("http", "ws")}//${window.location.hostname}` // production (remote)

const colyseus = new Colyseus.Client(endpoint);

module.exports = class Game extends Phaser.Scene {
    constructor() {
        super('Game');
    }

    init() {
        this.room = null;
        this.roomJoined = false;
        this.cursors = null;
        this.players = {};
    }

    preload() {
        this.load.image('logo', 'asset/logo.png');
    }

    create() {
        this.connect();

        this.cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        let move = {
            left: this.cursors.left.isDown,
            right: this.cursors.right.isDown,
            up: this.cursors.up.isDown,
            down: this.cursors.down.isDown
        };
        if (this.roomJoined) {
            this.room.send(move);
        }
    }

    connect() {
        var self = this;
        this.room = colyseus.join('main', {});
        this.room.onJoin.add(function() {
            self.roomJoined = true;
        });
        this.room.listen("players/:id", function(change) {
            if (change.operation == "add") {
                self.addPlayer(change.value);
            }
            else if (change.operation == "remove") {
                self.removePlayer(change.path.id);
            }
        });

        this.room.listen("players/:id/:attribute", function(change) {
            if (change.operation == "replace") {
                let path = change.path;
                if (path.attribute == "x" || path.attribute == "y") {
                    self.players[path.id].sprite[path.attribute] = change.value;
                }
            }
        });
    }

    addPlayer(data) {
        let id = data.id;
        this.players[id] = {};
        let sprite = this.add.sprite(data.x, data.y, 'logo');
        sprite.setScale(0.25);
        this.players[id].sprite = sprite;
    }

    removePlayer(id) {
        this.players[id].sprite.destroy();
        delete this.players[id];
    }
} 