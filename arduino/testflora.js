var pixel = require("node-pixel");
var five = require("johnny-five");

var board = new five.Board({
    repl: false,
    debug: false
});

var strip = null;

var stripObj = {
    blink: function(paint, flash_count){
      var light_delay = 10;
      var off_delay = 20;
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
        console.log(stripObj.blink("green", 5));

    });
    // this.repl.inject({
    //   // Allow limited on/off control access to the
    //   // Led instance from the REPL.
    //   strip:stripObj
    // });
});

//board.isConnected
//board.isReady
