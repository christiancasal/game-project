var strip = require('./flora.js');

strip.init()
var counter = 0;

setInterval(function(){
  counter++
  if(counter % 2 === 0){
    strip.red();
  }
  else{
    strip.green();
  }
}, 1000);
