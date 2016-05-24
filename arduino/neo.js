pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();
var strip = null;

board.on("ready", function() {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 8, length: 1}, ], // this is preferred form for definition
    });

    strip.on("ready", function() {
        // do stuff with the strip here.
        var p = strip.pixel(0);     // get second LED
        p.color("green");         // set second pixel blue.
        strip.show();
    });
});
