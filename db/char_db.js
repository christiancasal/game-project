//defines marvel api
var Marvel = require('marvel');
var mysql = require('mysql');
var Characters = require('../models/models.js')[0];
var Users = require('../models/models.js')[1];

var marvel = new Marvel({
 publicKey: "b1b727a58d3508f5c1a681cbd0adce76",
 privateKey: "fc8a8f03c5831137b724047630905a26674adf7c"
});

//defines sequelize
var Sequelize = require('sequelize');

var faux_rm = {
  read: function(cb){
    Characters.findAll({})
      .then(function(posts){
      cb(posts);
    });
  },
  create: function(some_name, cb){
     marvel.characters.name(some_name).get(function(err, resp){
       if (err) { console.log("Error: ", err) }
       else{
         Characters.create({
           char_name: resp[0].name,
           char_img: resp[0].thumbnail.path + '.' + resp[0].thumbnail.extension,
           health_level: 1000,
           attack_power: 100
         }).then(function (data) {
           // console.log(data);
            console.log('Added ' + some_name + ' to Database !');
            });
         }
       })
  }
}

module.exports = faux_rm;
