var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var marvelCharacters = require('../models/models.js')[0];
var User = require('../models/models.js')[1];
var Games = require('../models/gameContainer.js');

router.get('/game', function(req, res){
	var hbsObject = {
		message : req.session.message,
		hostedGameId : req.session.hosted,
		logged_in : req.session.logged_in,
		username : req.session.username,
		playerOne : req.session.playerOne,
		active : req.session.activeGame
	};
	if (!req.session.logged_in) {
		res.render('login.hbs', { hbsObject });
	} else if (!req.session.chosen && req.session.logged_in) {
		marvelCharacters.findAll({}).then(function(result){
				hbsObject.characters = result;
				hbsObject.message = req.session.message;
			res.render('chose-character', { hbsObject });
		});
	} else if (req.session.start) {
		res.render('testgame', { hbsObject });
	} else if (req.session.lobby) {
		res.render('lobby', { hbsObject });
	}
});

router.post('/game/signup', function(req, res){
	User.findOne({
		where: {username : req.body.username}
	}).then(function(user){
		if (!user) {
			bcrypt.genSalt(10, function(err, salt) {
				bcrypt.hash(req.body.password, salt, function(err, hash) {
					User.create({
						username: req.body.username,
						password_hash: hash,
						wins: 0,
						loses: 0,
						streak: 0,
						high_score:0
					}).then(function(user){
						req.session.logged_in = true;
						req.session.username = user.username;
						req.session.message = 'Choose a character, ' + req.session.username;
						res.redirect('/game')
					});
				});
			});
		} else {
			req.session.message = 'That username already exists';
			res.redirect('/game')
		}
	})
})

router.post('/game/login', function(req, res){
	User.findOne({
		where: { username: req.body.username}
	}).then(function(user) {
		if (user) {
			bcrypt.compare(req.body.password, user.password_hash, function(err, result) {
				if (result == true){
					console.log(user)
					req.session.logged_in = true;
					req.session.username = user.username;
					req.session.message = 'Choose a character, ' + req.session.username;
					if (user.administrator) {
						req.session.admin = true;
						res.redirect('/admin');
					} else{
						res.redirect('/game');
					}
				} else {
					req.session.message = 'Password incorrect';
					res.redirect('/game');
				}
			});
		} else {
			req.session.message = 'Username not found';
			res.redirect('/game');
		}
	})
})

router.post('/game/chooseCharacter', function(req, res){
	req.session.logged_in = true;
	req.session.chosen = true;
	req.session.characterId = req.body.character;
	marvelCharacters.findOne({
		where: { character_id: req.session.characterId}
	}).then(function(user){
		req.session.img = user.char_img;
		req.session.health = user.health_level;
		req.session.attack = user.attack_power;
		req.session.defense = user.defense_power;
		req.session.character = user.char_name;
		req.session.ROF = user.fire_rate;
		req.session.hosted = Games.newGame(req.session.username, req.session.character, req.session.img, req.session.health, req.session.attack, req.session.defense, req.session.ROF);
		req.session.lobby = true;
		res.redirect('/game');
	});
})

router.get('/game/join/:gameID', function(req, res){
	if (!req.session.logged_in || !req.session.chosen) {
		res.redirect('/game');
	} else {
		req.session.hosted = req.params.gameID;
		Games.joinGame(req.params.gameID, req.session.username, req.session.character, req.session.img, req.session.health, req.session.attack, req.session.defense, req.session.ROF);
		req.session.playerOne = true;
		res.redirect('/game/start');
	}
});

router.get('/game/start', function(req, res){
	req.session.start = true;
	res.redirect('/game');
})

module.exports = router;
