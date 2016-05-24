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
        // strip.color("#ff0000"); // turns entire strip red using a hex colour
        // strip.show();
        strip.off();
        strip.show();
        // console.log('the strip is ready');
    });

    this.repl.inject({
      strip: strip,

    });
});
