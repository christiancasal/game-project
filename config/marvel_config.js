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
  config_hp: function(character, new_hp){
    faux_rm.update_health(character, new_hp);
  },
  config_att: function(character, new_att){
    faux_rm.update_attack(character, new_att);
  }
}


module.exports = marvel_call;

//example calls-----------------------------
//
//READS THE CHARACTERS TABLE AND RETURNS IT TO CONSOLE
//marvel_call.read(function(data){
//console.log(data);
//});
//
//
//ADDS 'HAWKEYE' TO THE CHARACTERS TABLE
////marvel_call.add_character('hawkeye')
//
//ADDS THE INITIAL SET OF HEROES TO THE DATABASE
//marvel_call.initialize();
//
//
//TO UPDATE THE CHARACTERS HP AND ATTACK
//marvel_call.config_hp('Hulk', 10000);
//
//--------------------------------------
