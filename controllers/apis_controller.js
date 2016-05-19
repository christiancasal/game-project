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

router.get('/api/:gameId', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.params.gameId) {
			var currentGame = Games.activeGames[i];
		}
	}
	res.send(currentGame);
});

router.get('/api/move/:gameId', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.params.gameId) {
			Games.activeGames[i].currentMove += 1;
			res.send('success');
		}
	}
});

router.get('/api/health/:newHealth', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.params.gameId) {
			if (req.session.playerOne) {
				Games.activeGames[i].playerOne.health = req.params.newHealth;
			} else {
				Games.activeGames[i].playerTwo.health = req.params.newHealth;
			}
		}
	}
});

router.get('/api/attack/:newAttack', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.params.gameId) {
			if (req.session.playerOne) {
				Games.activeGames[i].playerOne.attack = req.params.newAttack;
			} else {
				Games.activeGames[i].playerTwo.attack = req.params.newAttack;
			}
		}
	}
});

router.get('/api/defense/:newDefense', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.params.gameId) {
			if (req.session.playerOne) {
				Games.activeGames[i].playerOne.defense = req.params.newDefense;
			} else {
				Games.activeGames[i].playerTwo.defense = req.params.newDefense;
			}
		}
	}
});

router.get('/api/position/:newPosition', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.params.gameId) {
			if (req.session.playerOne) {
				Games.activeGames[i].playerOne.position = req.params.newPosition;
			} else {
				Games.activeGames[i].playerTwo.position = req.params.newPosition;
			}
		}
	}
});

router.get('/api/update/:gameId/:atk/:hp/:def/:pos', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.params.gameId) {
			if (req.session.playerOne) {
				Games.activeGames[i].playerOne.attack = req.params.atk;
				Games.activeGames[i].playerOne.health = req.params.hp;
				Games.activeGames[i].playerOne.defense = req.params.def;
				Games.activeGames[i].playerOne.position = req.params.pos;
			} else {
				Games.activeGames[i].playerTwo.attack = req.params.atk;
				Games.activeGames[i].playerTwo.health = req.params.hp;
				Games.activeGames[i].playerTwo.defense = req.params.def;
				Games.activeGames[i].playerTwo.position = req.params.pos;
			}
		}
	}
});


module.exports = router;