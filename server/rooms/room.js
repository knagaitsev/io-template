const Room = require('colyseus').Room;

module.exports = class MyRoom extends Room {

    onInit () {
        this.setState({
            players: {}
        })
    }

    onJoin (client, options) {
        var self = this;
        this.state.players[client.sessionId] = {
            x: 200,
            y: 200,
            id: client.sessionId
        };
    }

    onMessage (client, data) {
        let player = this.state.players[client.sessionId];
        var speed = 5;
        if (data.left) {
            player.x -= speed;
        }
        else if (data.right) {
            player.x += speed;
        }

        if (data.up) {
            player.y -= speed;
        }
        else if (data.down) {
            player.y += speed;
        }
    }

    onLeave (client) {
        delete this.state.players[ client.sessionId ];
    }

}