var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var Games = require('../models/gameContainer.js');

router.get('/api', function(req, response){
	var allGames = Games.activeGames
	for (var i = 0; i < allGames.length; i++) {

	}
	response.send(allGames);
});

router.get('/api/game', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
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

router.get('/api/update/:atk/:hp/:def/:pos', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
				console.log('in here')
				Games.activeGames[i].playerOne.attack = req.params.atk;
				Games.activeGames[i].playerOne.health = req.params.hp;
				Games.activeGames[i].playerOne.defense = req.params.def;
				Games.activeGames[i].playerOne.position = req.params.pos;
			} else {
				console.log('in here two')
				Games.activeGames[i].playerTwo.attack = req.params.atk;
				Games.activeGames[i].playerTwo.health = req.params.hp;
				Games.activeGames[i].playerTwo.defense = req.params.def;
				Games.activeGames[i].playerTwo.position = req.params.pos;
			}
			res.send({"status" :"success"});
		}
	}
});


module.exports = router;