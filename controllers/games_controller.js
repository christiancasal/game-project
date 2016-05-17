var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var marvelCharacters = require('../models/models.js')[0];
var User = require('../models/models.js')[1];

router.get('/game', function(req, res){
	var hbsObject = {
			logged_in : req.session.logged_in,
			character_chosen : req.session.chosen,
			username : req.session.username,
			message : req.session.message
		};
	if (!req.session.chosen && req.session.logged_in) {
		marvelCharacters.findAll({}).then(function(result){
			hbsObject.characters = result;
		});
	} 
	res.render('game', { hbsObject });
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
						streak: 0
					}).then(function(user){
						req.session.logged_in = true;
						req.session.username = user.username;
						req.session.message = 'Chose a character, ' + req.session.username;
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

					req.session.logged_in = true;
					req.session.username = user.username;
					req.session.message = 'Chose a character, ' + req.session.username;
					res.redirect('/game');
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
	res.redirect('/game')
})
module.exports = router;
