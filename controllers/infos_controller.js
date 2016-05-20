var express = require('express');
var router = express.Router();
var Games = require('../models/gameContainer.js');

/* GET home page. */
router.get('/', function(req, res) {
	res.redirect('/game')
});

// router.get('/highscores', function(req, res){
// 	res.render('highscores', {title: 'Highscores page'});
// });

router.get('/characters', function(req, res){
	res.render('characters', {title: 'Characters page'});
});

router.get('/about', function(req, res){
	res.render('about', {title: 'About page'});
});

router.get('/logout', function(req, res){
	Games.endGame(req.session.hosted);
	req.session.destroy();
	res.redirect('/game')
})
module.exports = router;
