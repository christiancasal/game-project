var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var Games = require('../models/gameContainer.js');

var flora;

router.get('/api', function(req, response){
	var allGames = Games.activeGames
	for (var i = 0; i < allGames.length; i++) {

	}
	response.send(allGames);
});

router.get('/api/game', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (Games.activeGames[i].playerOne.position > 98 || Games.activeGames[i].playerTwo.position > 98) {
			req.session.gameover = true;
		}
			req.session.activeGame = true;
			res.send(Games.activeGames[i]);
		}
	}
});

router.get('/api/move', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			Games.activeGames[i].currentMove += 1;
			res.send({"status" :"success"});
		}
	}
});

router.get('/api/update/:atk/:hp/:def/:pos/:rof', function(req, res){
	flora = require('../arduino/flora.js');
	console.log("this is api controller game route");
	console.log(flora);

	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
				console.log('in here')
				console.log('player one got hit - flora red! ');
				console.log(Games.activeGames[i].playerOne.health);
				console.log(req.params.hp);
				if(Games.activeGames[i].playerOne.health < req.params.hp){
					setTimeout(function(){
						for (var i = 0; i < 4; i++) {
							flora.red();
							setTimeout(function(){
								for (var j = 0; j < 4; j++) {
									flora.off();
								}
							}, 100);
						}
					}, 100);
				}
				Games.activeGames[i].playerOne.attack = req.params.atk;
				Games.activeGames[i].playerOne.health = req.params.hp;
				Games.activeGames[i].playerOne.defense = req.params.def;
				Games.activeGames[i].playerOne.position = req.params.pos;
				Games.activeGames[i].playerOne.ROF = req.params.rof;
			} else {
				console.log('in here two')
				console.log(Games.activeGames[i].playerTwo.health);
				console.log(req.params.hp);
				// console.log('player two got hit - flora red! ');
				// if(Games.activeGames[i].playerTwo.health < req.params.hp){
				// 	flora.red();
				// 	setTimeout(function(){ flora.off() }, 100);
				// }
				Games.activeGames[i].playerTwo.attack = req.params.atk;
				Games.activeGames[i].playerTwo.health = req.params.hp;
				Games.activeGames[i].playerTwo.defense = req.params.def;
				Games.activeGames[i].playerTwo.position = req.params.pos;
				Games.activeGames[i].playerTwo.ROF = req.params.rof;
			}
			res.send({"status" :"success"});
		}
	}
});

router.get('/api/updateEnemy/:atk/:hp/:def/:pos/:rof', function(req, res){
	flora = require('../arduino/flora.js');
	console.log("this is api controller game route");
	console.log(flora);

	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
				console.log('in here')
				// if(Games.activeGames[i].playerTwo.health > req.params.hp){
				// 	flora.green();
				// }
				Games.activeGames[i].playerTwo.attack = req.params.atk;
				Games.activeGames[i].playerTwo.health = req.params.hp;
				Games.activeGames[i].playerTwo.defense = req.params.def;
				Games.activeGames[i].playerTwo.position = req.params.pos;
				Games.activeGames[i].playerTwo.ROF = req.params.rof;
			} else {
				console.log('in here two')
				// if(Games.activeGames[i].playerOne.health > req.params.hp){
				// 	flora.red();
				// }
				Games.activeGames[i].playerOne.attack = req.params.atk;
				Games.activeGames[i].playerOne.health = req.params.hp;
				Games.activeGames[i].playerOne.defense = req.params.def;
				Games.activeGames[i].playerOne.position = req.params.pos;
				Games.activeGames[i].playerOne.ROF = req.params.rof;
			}
			res.send({"status" :"success"});
		}
	}
});

module.exports = router;
