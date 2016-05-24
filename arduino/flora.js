pixel = require("node-pixel");
five = require("johnny-five");

var board = new five.Board();
var strip = null;

var sequence = [];
var current_pos;
var sequenceInterval;

var stripObj = {
  red: function(){
    strip.color("red"); // turns entire strip red using a hex colour
    strip.show();
  },
  off: function(){
    strip.off();
    strip.show();
  }
}

board.on("ready", function() {

    strip = new pixel.Strip({
        board: this,
        controller: "FIRMATA",
        strips: [ {pin: 6, length: 24}, ], // this is preferred form for definition
    });

    strip.on("ready", function() {
        // do stuff with the strip here.
        sequence.push(function() {
          current_pos = 1;
          sequenceInterval = setInterval(function() {
            strip.color("rgb(127, 127, 127)");

            var p = strip.pixel(current_pos);
            p.color("black");
            if (current_pos+1 >= strip.stripLength()) { current_pos = 1; }
            else { current_pos++; }

            strip.show();
          });
        })        // console.log('the strip is ready');
    });

    this.repl.inject({
      strip: stripObj
      });
});
console.log(stripObj);

module.exports = stripObj;
