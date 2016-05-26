var pixel = require("node-pixel");
var five = require("johnny-five");

var board = new five.Board({
    repl: false,
    debug: false
});

var strip = null;

var stripObj = {
    red: function(){
      strip.color("red"); // turns entire strip red using a hex colour
      strip.show();
    },
    green: function(){
      strip.color("green"); // turns entire strip red using a hex colour
      strip.show();
    },
    off: function(){
      strip.off();
      strip.show();
    }
}

var fps = 20;

board.on("ready", function() {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 6, length: 24}, ], // this is preferred form for definition
    });

    strip.on("ready", function() {
        // do stuff with the strip here.

        console.log('Strip is ready!');
        stripObj.off();
        sendStrip();
    });
});


function sendStrip() {
  console.log('object sent this is flora.js');
  console.log(strip);
  module.exports = stripObj;
}
