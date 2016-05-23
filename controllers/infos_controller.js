var express = require('express');
var router = express.Router();
var Games = require('../models/gameContainer.js');
var marvelCharacters = require('../models/models.js')[0];

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/game')
});

// router.get('/highscores', function(req, res){
// 	res.render('highscores', {title: 'Highscores page'});
// });

router.get('/characters', function(req, res){
	var hbsObject = {
		message : req.session.message,
		hostedGameId : req.session.hosted,
		logged_in : req.session.logged_in,
		username : req.session.username,
		playerOne : req.session.playerOne,
		active : req.session.activeGame,
		title: 'Characters page'
	};
	res.render('characters', { hbsObject });
});

router.get('/about', function(req, res){
	var hbsObject = {
		message : req.session.message,
		hostedGameId : req.session.hosted,
		logged_in : req.session.logged_in,
		username : req.session.username,
		playerOne : req.session.playerOne,
		active : req.session.activeGame,
		title: 'About page'
	};
	res.render('about', { hbsObject });
});

router.get('/highscores', function(req, res){
	var hbsObject = {
		message : req.session.message,
		hostedGameId : req.session.hosted,
		logged_in : req.session.logged_in,
		username : req.session.username,
		playerOne : req.session.playerOne,
		active : req.session.activeGame,
		title: 'Highscores page'
	};
	res.render('highscores', { hbsObject });
});

router.get('/logout', function(req, res){
	Games.endGame(req.session.hosted);
	req.session.destroy();
	res.redirect('/game')
})

router.get('/admin', function(req, res){
	if (!req.session.admin) {
		res.redirect('/game');
	} else {
		marvelCharacters.findAll({}).then(function(result){
			var hbsObject = {};
				hbsObject.characters = result;
				hbsObject.message = req.session.message;
			res.render('admin', { hbsObject });
		});
	}
});

router.post('/updateCharacter', function(req, res){
	marvelCharacters.update({
		attack_power: req.body.attack,
		health_level: req.body.health,
		defense_power: req.body.defense  
	},{
		where: {
			character_id: req.body.id 
		}
	});

	var hbsObject = {};
	res.end();
});

router.post('/newCharacter', function(req, res, next){
	console.log('here')
	console.log(req.body)
    marvelCharacters.create({
      char_name: req.body.name,
      char_img: req.body.image,
      health_level: req.body.health,
      attack_power: req.body.attack,
      defense_power: req.body.defense
    }).then(function (data) {
      console.log(data);
       console.log('Added ' + data.char_name + ' to Database !');
       });
})

router.post('/deleteCharacter', function(req, res){
	marvelCharacters.destroy({
  where: {
    character_id: req.body.id
  }
	});
	res.redirect('/admin');
});

router.post('/server/reset', function(req, res){
	if (req.body.code == "password1") {
		Games.activeGames = [];
		req.session.message = "server reset successfully"
	} else {
		req.session.message = "server reset password incorrect"
	}
	res.redirect('/admin')
})

module.exports = router;
