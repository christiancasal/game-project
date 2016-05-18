var faux_rm = require('../db/char_db.js')

//array for initial config
var heroes = [
  'iron man',
  'hulk',
  'black panther',
  'spider-man',
  'captain america',
  'thor',
  'Ant-Man (Eric O\'Grady)',
  'falcon',
  'daredevil',
  'Star-Lord (Peter Quill)',
  'wolverine',
  'kingpin',
  'red skull',
  'purple man',
  'loki',
  'punisher',
  'winter soldier',
  'magneto',
  'carnage',
  'apocalypse',
  'thanos'
];

var marvel_call = {
  read: function(cb){
    faux_rm.read(function(res){
      cb(res);
    });
  },
  add_character: function(character){
    faux_rm.create(character);
  },
  initialize: function(){
    //run the for loop below for initial seeding
    for (var i = 0; i < heroes.length; i++) {
      faux_rm.create(heroes[i]);
    };
  },
}

module.exports = marvel_call;

//example calls-----------------------------
//
//read the current table and returns it to console
//marvel_call.read(function(data){
//console.log(data);
//});
//
//
//adds 'hawkeye' to the character table
////marvel_call.add_character('hawkeye')
//
//adds the first set of heroes(21) to the Database
//marvel_call.initialize();
//
//--------------------------------------

// Users.findAll({})
//   .then(function(posts){
//   msg.msgIn = posts;
//   console.log(posts);
// });
