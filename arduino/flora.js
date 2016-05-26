var pixel = require("node-pixel");
var five = require("johnny-five");

var board = new five.Board({
    repl: false,
    debug: false
});

var strip = null;

var fps = 15;

var stripObj = {
    blink: function(paint, flash_count, fps){
      var light_delay = fps;
      var off_delay = fps * 2;
      var light_counter = 0;
      var off_counter = 0;
      var light_timer = setInterval(function(){
        stripObj.paint(paint)
        light_counter++;
        console.log('light_timer');
        if(light_counter === flash_count){
          clearInterval(light_timer);
        }
      }, 1000/light_delay);

      var off_timer = setTimeout(function() {
        var off_timer_int = setInterval(function(){
          stripObj.off();
          off_counter++
          console.log('off_timer');
          console.log(off_counter);
          if(off_counter === flash_count){
            clearInterval(off_timer_int);
          }
        }, 1000/light_delay);
      }, 1000/off_delay)
    },
    paint: function(paint){
      strip.color(paint); // turns entire strip red using a hex colour
      strip.show();
    },
    select_color: ["red", "green", "blue", "yellow", "teal", "pink", "orange", "purple"],
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

        console.log('Strip is ready!');
        // stripObj.off();
        stripObj.blink("blue", 5, fps);
        sendStrip();
    });
});


function sendStrip() {
  console.log('object sent this is flora.js');
  console.log(strip);
  module.exports = stripObj;
}
