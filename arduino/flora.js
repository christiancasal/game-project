var five = require("johnny-five");
var myBoard, myLed;

myBoard = new five.Board();

myBoard.on("ready", function() {

  myLed = new five.Led(8);

  myLed.strobe( 1000 );

  // make myLED available as "led" in REPL

  this.repl.inject({
    led: myLed
  });


  // try "on", "off", "toggle", "strobe", "stop" (stops strobing)
});
