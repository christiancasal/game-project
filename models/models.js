var Sequelize = require("sequelize");

var sequelizeConnection = require("../config/connection.js");


//creates a characters table
var Characters = sequelizeConnection.define('characters', {
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
	defense_power: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	fire_rate: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
	// ,
	// created_at: {
	// 	type: Sequelize.DATE,
	// 	allowNull: false
	// },
	// updated_at: {
	// 	type: Sequelize.DATE,
	// 	allowNull: false
	// }

}
// , {
//
//   timestamps: true,
//
//   created_at: true,
//
//   updated_at: 'updateTimestamp'
//
// }
);

//creates a Users table
var Users = sequelizeConnection.define('users', {
	user_id: {
		type: Sequelize.INTEGER,
		autoIncrement: true,
		allowNull: false,
		primaryKey: true
	},
	username: {
		type: Sequelize.STRING,
		allowNull: false
	},
	password_hash: {
		type: Sequelize.STRING,
		allowNull: false
	},
	wins: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	loses: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	streak: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	high_score: {
		type: Sequelize.INTEGER,
		allowNull: false
	},
	administrator: {
		type: Sequelize.INTEGER,
		allowNull: false
	}
},
{
	underscored: true
});

Characters.sync();
Users.sync({
    force: true
});

// Makes the Cat Model available for other files (will also create a table)
module.exports = [Characters, Users];
