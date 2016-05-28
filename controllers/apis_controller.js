var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var Games = require('../models/gameContainer.js');
var flora, board;

board = require('../arduino/flora.js')[1];


router.get('/api', function(req, res){

	var allGames = Games.activeGames
	for (var i = 0; i < allGames.length; i++) {

	}
	res.send(allGames);
});

router.get('/api/lobbychat', function(req, res){
	res.send(Games.lobbyChat);
});

router.get('/api/gamechat', function(req, res){
	var emptyarr = [];
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if(Games.activeGames[i].chat == null){
				console.log('just shut up shut up');
				console.log(Games.activeGames[i].chat);
				res.end();
			}
			if(Games.activeGames[i].chat == emptyarr){
				console.log('just shut up shut up');
				console.log(Games.activeGames[i].chat);
				res.end();
			}
			else{
			console.log('chat me silvers');
			res.send(Games.activeGames[i].chat)
			}
		}
	}
});

router.post('/api/lobbypost', function(req, res){
	msgObj = {
		username : req.body.user,
		message : req.body.usermsg,
		time : req._startTime
	}
	Games.lobbyChat.push(msgObj)
	res.end();
})

router.post('/api/gamepost', function(req, res){
	msgObj = {
		username : req.body.user,
		message : req.body.usermsg,
		time : req._startTime
	}
	console.log('****************************** ['+msgObj.message+'] ****************************************');
	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			Games.activeGames[i].chat.push(msgObj);
			res.end();
		}
	}

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
	board = require('../arduino/flora.js')[1];

	if(board){
		flora = require('../arduino/flora.js')[0];
		console.log("this is api controller game route");
		console.log(flora);

	}

	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
				if(Games.activeGames[i].playerOne.health < req.params.hp && board === true){
					flora.err();
				}
				Games.activeGames[i].playerOne.attack = req.params.atk;
				Games.activeGames[i].playerOne.health = req.params.hp;
				Games.activeGames[i].playerOne.defense = req.params.def;
				Games.activeGames[i].playerOne.position = req.params.pos;
				Games.activeGames[i].playerOne.ROF = req.params.rof;
			} else {
				if(board){
					flora.ok();
				}
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

	board = require('../arduino/flora.js')[1];

	if(board){
		flora = require('../arduino/flora.js')[0];
		console.log("this is api controller game route");
		console.log(flora);

	}

	for (var i = 0; i < Games.activeGames.length; i++) {
		if (Games.activeGames[i].gameId == req.session.hosted) {
			if (req.session.playerOne) {
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

router.get('/api/blink_bad', function(req,res){
	board = require('../arduino/flora.js')[1];

	if(board){
		flora = require('../arduino/flora.js')[0];
		console.log("this is api controller route - blink bad");
		console.log(flora);
		flora.blink("red", 1, 20);
		res.end();
	}
	else{
		res.end();
	}
});

router.get('/api/blink_good', function(req,res){
	board = require('../arduino/flora.js')[1];

	if(board){
		flora = require('../arduino/flora.js')[0];
		console.log("this is api controller game route");
		console.log(flora);
		flora.blink("green", 1, 20);
		res.end();
	}
	else {
			res.end();
	}
});
module.exports = router;
