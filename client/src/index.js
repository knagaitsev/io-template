const $ = require("jquery");
const Phaser = require('phaser');
const Game = require("./game.js");
require('./../css/main.css');

(function() {
    const aspectRatio = 16 / 9;
    
    //fit game container so that game always appears "fullscreen",
    //but cut off edges when viewport is not correct aspect ratio
    function resizeContainer() {
        let elem = $("#phaser-example");
        elem.css("width", "100%");
        elem.css("height", "100%");
        elem.css("left", 0);
        elem.css("top", 0);
        let w = elem.width();
        let h = elem.height();
        let scaledHeight = h * aspectRatio;
        let scaledWidth = w / aspectRatio;
        if (w < scaledHeight) {
            elem.css("width", scaledHeight);
            elem.css("left", - (scaledHeight - w) / 2);
        }
        else if (h < scaledWidth) {
            elem.css("height", scaledWidth);
            elem.css("top", - (scaledWidth - h) / 2);
        }
    }
    
    resizeContainer();
    $(window).resize(resizeContainer);
    $('.button').on("click", function(){ $(window).trigger('resize') });

    const height = 720;
    const width = height * aspectRatio;
    var config = {
        type: Phaser.AUTO,
        parent: 'phaser-example',
        width: width,
        height: height,
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
})();