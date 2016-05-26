var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var Games = require('../models/gameContainer.js');

router.get('/api', function(req, res){
	var allGames = Games.activeGames
	for (var i = 0; i < allGames.length; i++) {

	}
	res.send(allGames);
});

router.get('/api/lobbychat', function(req, res){
	res.send(Games.lobbyChat);
});

router.post('/api/lobbypost', function(req, res){
	msgObj = {
		username : req.body.user,
		message : req.body.usermsg,
		time : req._startTime
	}
	Games.lobbyChat.push(msgObj)
})

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

router.post('/api/available', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			console.log('here 0')
			if (JSON.parse(req.body.availability)) {
				console.log('here 1')
				Games.activeGames[i].available = true;
			} else {
				console.log('here 2')
				Games.activeGames[i].available = false;
			}
			res.end();
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

router.get('/api/update/:atk/:hp/:def/:pos/:rof', function(req, res){
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
				console.log('in here')
				Games.activeGames[i].playerOne.attack = req.params.atk;
				Games.activeGames[i].playerOne.health = req.params.hp;
				Games.activeGames[i].playerOne.defense = req.params.def;
				Games.activeGames[i].playerOne.position = req.params.pos;
				Games.activeGames[i].playerOne.ROF = req.params.rof;
			} else {
				console.log('in here two')
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
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
				console.log('in here')
				Games.activeGames[i].playerTwo.attack = req.params.atk;
				Games.activeGames[i].playerTwo.health = req.params.hp;
				Games.activeGames[i].playerTwo.defense = req.params.def;
				Games.activeGames[i].playerTwo.position = req.params.pos;
				Games.activeGames[i].playerTwo.ROF = req.params.rof;
			} else {
				console.log('in here two')
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