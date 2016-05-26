// *********************************************************************************
// CONNECTION.JS - THIS FILE INITIATES THE CONNECTION TO MYSQL / FLORA
// *********************************************************************************

// Dependencies
var Sequelize = require("sequelize"), connection;
var flora = require('../arduino/flora.js');
// console.log('this is connection.js');
// console.log(flora);

if(process.env.JAWSDB_URL) {
  connection = new Sequelize(process.env.JAWSDB_URL);
} else {
  // Lists out connection options
  var source = {
      localhost: {
          host: 'localhost',
          user: 'root',
          password: "",
          database: "game_project"
      }
  }
}



// Selects a connection (can be changed quickly as needed)
var selectedSource = source.localhost;

// Creates mySQL connection using Sequelize

var sequelize = new Sequelize(selectedSource.database, selectedSource.user, selectedSource.password, {
  define: { timestamps: false },
  host: selectedSource.host,
  dialect: 'mysql',

  pool: {
    max: 5,
    min: 0,
    idle: 10000
  },

});

// Exports the connection for other files to use
module.exports = sequelize;
