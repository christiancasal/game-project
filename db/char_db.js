//defines marvel api
var Marvel = require('marvel');
var mysql = require('mysql');

var marvel = new Marvel({
 publicKey: "",
 privateKey: ""
});

//defines sequelize
var Sequelize = require('sequelize');
var sequelize = new Sequelize('game_project', 'root', '');

//creates a characters table
var Characters = sequelize.define('characters', {
  character_id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true
  },
  char_name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  char_img: {
    type: Sequelize.STRING,
    allowNull: false
  },
  health_level: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  attack_power: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
});

//array to feed the marvel api
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

//calls the marvel api using the heroes (and villains) array
for (var i = 0; i < heroes.length; i++) {
  marvel.characters
    .name(heroes[i])
    .get(function(err, resp) {
      if (err) { console.log("Error: ", err) }
      else {
        // console.log(resp[0].name);
        // console.log(resp[0].thumbnail.path);
        // console.log(resp[0].thumbnail.extension);
        sequelize.sync({force: true}).then(function () {
          Characters.create({
            char_name: resp[0].name,
            char_img: resp[0].thumbnail.path + '.' + resp[0].thumbnail.extension,
            health_level: 1000,
            attack_power: 100
          }).then(function (data) {
            // console.log(data);
          });
        });
    }
  });
};

//exports the Characters table for query
module.exports = Characters;
