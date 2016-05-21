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

router.get('/api/board/:pos1/:pos2/:pos3/:pos4', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
				Games.activeGames[i].gameState.pOneBoard = [req.params.pos1, req.params.pos2, req.params.pos3, req.params.pos4];
				if (Games.activeGames[i].gameState.pTwoBoard == undefined) {
					res.send([{"failed" : true}, Games.activeGames[i]]);
				}
			} else {
				Games.activeGames[i].gameState.pTwoBoard = [req.params.pos1, req.params.pos2, req.params.pos3, req.params.pos4];
				if (Games.activeGames[i].gameState.pOneBoard == undefined) {
					res.send([{"failed" : true}, Games.activeGames[i]]);
				}
			}
		res.send([{"failed" : false}, Games.activeGames[i]]);
		}
	}
})

router.get('/api/move', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			Games.activeGames[i].currentMove += 1;
			res.send({"status" :"success"});
		}
	}
});

router.get('/api/health/:newHealth', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			console.log('in for loop')
			if (req.session.playerOne) {
				console.log('in if loop')
				Games.activeGames[i].playerOne.health = req.params.newHealth;
			} else {
				console.log('in if loop')
				Games.activeGames[i].playerTwo.health = req.params.newHealth;
			}
			res.send({"status" :"success"});
		}
	}
});

router.get('/api/attack/:newAttack', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
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
		if (Games.activeGames[i].gameId == req.session.hosted) {
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
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
				Games.activeGames[i].playerOne.position = req.params.newPosition;
			} else {
				Games.activeGames[i].playerTwo.position = req.params.newPosition;
			}
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