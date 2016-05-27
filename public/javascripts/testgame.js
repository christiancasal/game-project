//This code block seperates the different players at the start of the game
//================================================================================

$(document).ready(function(){
	(function gamechatter(){
	    $.ajax({
	        dataType: 'json',
	        url: '/api/gamechat',
	        cache: false,
	        method: 'GET'})
	        .done(function(response) {
	        for (var i = 0; i < response.length; i++) {
	            console.log(response)
	            identifier = String(moment(response[i].time).format('MMMM Do YYYY, h:mm:ss a') + response[i].username);
	            identifier = identifier.replace(/[,:\s]+/g, '');

	            if ($('#'+ identifier).text().length == 0) {
	                $('#messageBoard-game').append('<div class="_msgblock"><div class="_Gusername" id="'+ identifier +'">' +response[i].username+'</div><div class="_Gmessage">' + response[i].message + '</div><div class="_Gtimestamp">' + moment(response[i].time).format('MMMM Do YYYY, h:mm:ss a') + '</div></div><div class="clearfix"></div>');
	            }
	        }
	    })
	    setTimeout(gamechatter, 100);
	}());

	if ($('#player').text() == "true") {
		playerOne = true;
	} else {
		playerOne = false;
	};
	if ($('#activeGame').text() == "true") {
		update(false);
	} else {
		update(true);
	}
});
var empty = [];
var dots = '.';
var playerName;
var charNoUnderscore;
var enemyName;
var enemyNoUnderscore;
function update(initial){ //updates health attack defense and board.
	$.ajax({
		dataType: 'json',
		url: '/api/game',
		method: 'GET'})
	.done(function(initRes) {
	var currentMove = initRes.currentMove;
	//This sets up the references to player objects for each player
	//=========================================
	if (playerOne) {
		playerRef = initRes.playerOne;
		enemyRef = initRes.playerTwo;
	} else if (!playerOne) {
		playerRef = initRes.playerTwo;
		enemyRef = initRes.playerOne;
	}
	console.log(playerRef);
	console.log(currentMove);
	console.log(playerOne);
	console.log(enemyRef);
	//=========================================
	for (var i=0; i < 10; i++) {
		if (playerRef.board.indexOf(i) == -1) {
			empty.push(i);
		}
	};

	$('#player-health').html(playerRef.health);
	$('#player-defense').html(playerRef.defense);
	$('#player-attack').html(playerRef.attack);
	$('#player-rof').html(playerRef.ROF);

	$('#enemy-health').html(enemyRef.health);
	$('#enemy-defense').html(enemyRef.defense);
	$('#enemy-attack').html(enemyRef.attack);
	$('#enemy-rof').html(enemyRef.ROF);

	playerName = playerRef.character;
	console.log('this is playerName: ', playerName);
	charNoUnderscore = playerName.replace(/\s/g, '_');
	console.log('this is charNoUnderscore: ', charNoUnderscore);

	enemyName = enemyRef.character;
	console.log('this is enemyName: ', enemyName);
	enemyNoUnderscore = enemyName.replace(/\s/g, '_');
	console.log('this is enemyNoUnderscore: ', enemyNoUnderscore);


	if (initial) {
		$('.player-one[data="0"]').css({
			'background-image' : 'url('+playerRef.image+')',
			'background-size' : '50px 50px'
		});

		$('.player-two[data="0"]').css({
			'background-image' : 'url('+enemyRef.image+')',
			'background-size' : '50px 50px'
		});
	}

	$('#action-view').css({
		'background-image' : 'url(images/background'+initRes.map+'.png)'
	});

	$('#player-image').attr('src', playerRef.image).css({
		'width' : '173px',
		'margin-top' : '5px'
	});

	$('#enemy-image').attr('src', enemyRef.image).css({
		'width' : '173px',
		'margin-top' : '5px'
	});

	$('.player-one[data="'+playerRef.board[0]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="'+playerRef.board[0]+'"]').addClass('defense');

	$('.player-one[data="'+playerRef.board[2]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="'+playerRef.board[2]+'"]').addClass('defense');

	$('.player-one[data="'+playerRef.board[3]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="'+playerRef.board[3]+'"]').addClass('defense');



	$('.player-one[data="'+playerRef.board[1]+'"]').css({
		'background-image' : 'url('+enemyRef.image+')',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="'+playerRef.board[1]+'"]').addClass('boss');

	$('.player-one[data="10"]').css({
		'background-image' : 'url('+enemyRef.image+')',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="10"]').addClass('boss');

	$('.player-two[data="'+enemyRef.board[0]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-two[data="'+enemyRef.board[0]+'"]').addClass('defense');

	$('.player-two[data="'+enemyRef.board[2]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-two[data="'+enemyRef.board[2]+'"]').addClass('defense');

	$('.player-two[data="'+enemyRef.board[3]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-two[data="'+enemyRef.board[3]+'"]').addClass('defense');



	$('.player-two[data="'+enemyRef.board[1]+'"]').css({
		'background-image' : 'url('+playerRef.image+')',
		'background-size' : '50px 50px'
	});
	$('.player-two[data="'+enemyRef.board[1]+'"]').addClass('boss');

	$('.player-two[data="10"]').css({
		'background-image' : 'url('+playerRef.image+')',
		'background-size' : '50px 50px'
	});
	$('.player-two[data="10"]').addClass('boss');

	for(i=0;i<playerRef.position;i++){
		$('.player-one[data="'+i+'"]').css({
			'background-image' : 'none',
			'background-size' : '50px 50px',
			'background-color' : '#777'
		});
	}

	$('.player-one[data="'+playerRef.position+'"]').css({ //Update current tile background-image
		'background-image' : 'url('+playerRef.image+')',
		'background-size' : '50px 50px'
	});

	for(i=0;i<enemyRef.position;i++){
		$('.player-two[data="'+i+'"]').css({
			'background-image' : 'none',
			'background-size' : '50px 50px',
			'background-color' : '#777'
		});
	}
	$('.player-two[data="'+enemyRef.position+'"]').css({
		'background-image' : 'url('+enemyRef.image+')',
		'background-size' : '50px 50px'
	});
	main(currentMove, playerRef, enemyRef);
	});
};


//================================================================================

function main(turn, player, enemy){
	$.ajax({
		dataType: 'json',
		url: '/api/game',
		method: 'GET'})
	.done(function(response) {
	if (turn % 2 == 0) { //This block decides whose turn it is based on the current move.
		playerOneTurn = true;			  //+
	} else {							  //+
		playerOneTurn = false;			  //+
	};									  //+

	if ((playerOne && playerOneTurn) || (!playerOne && !playerOneTurn)) { //This condition checks if it's either players turn. it's either player one's turn or player two's turn.
		$('#roll').removeClass('myhidden');



		if (enemy.position == 98) {
			$('#action-view').append($('<div class="defense-option">'));
			$('.defense-option').append($('<h1 class="defense-announcement">').html('Player Two was defeated in combat! You win!'));
			setTimeout(function(){
				location.href = "/stats"
				updater.allStats(player.attack, player.health, player.defense, 99, player.ROF);
			}, 3000)
		}	

		if (player.position == 10 && enemy.position == 10) {
			$('#roll-click').off();
			$('.roll-choice').off();
			$('#action-view').empty();
			$('#action-view').append($('<div class="defense-option">'));
			$('.defense-option').append($('<h1 class="defense-announcement">').html('<h2>Game is Over!</h2>'));
			setTimeout(function(){
				location.href = "/stats"
				updater.allStats(player.attack, player.health, player.defense, 99, player.ROF);
			}, 3000)
		}

		if (player.position == 10 && enemy.position != 10  && enemy.position != 99 && enemy.position != 98) {
			$('#roll-click').off();
			$('.roll-choice').off();
			$('#action-view').empty();
			$('#action-view').append($('<div class="defense-option">'));
			$('.defense-option').append($('<h1 class="defense-announcement">').html('Choose an upgrade while you wait...'));
			defenseItem(true);
		}
		function diceRoll(min, max) {
			for(i=1;i<=3;i++){
				var min = 1;
				var max = 4;
				var roll = Math.floor(Math.random() * (max - min)) + min;
				$('.roll-choice[data="'+i+'"]').html(roll);
			}
		};

		function defenseItem(endGame){
			if (!endGame) {
				$('#action-view').empty();
				$('#action-view').append($('<div class="defense-option">'));
				$('.defense-option').append($('<h1 class="defense-announcement">').html('Choose an Upgrade'));
				$('.defense-option').append($('<button id="select-consume">').html('<h2>CONSUME</h2><h3>Health +500</h3>'));
			}
				$('.defense-option').append($('<button id="select-smash">').html('<h2>SMASH</h2><h3>attack +15 defense +15</h3>'));
				$('.defense-option').append($('<button id="select-fire">').html('<h2>FIRE</h2><h3>Fire rate +10</h3>'));

		};

		$('#roll-click').on('click', function(){
			console.log('clicked on roll')
			diceRoll();
		});

		$('.roll-choice').on('click', function(){
			console.log('clicked on choice')
			var num = $(this).html();
			var roll = parseInt(num);
			// debugger;
			if(isNaN(roll)){ //if select "Press" || "Roll" || "Button"
				diceRoll();
				return
			}

			if((playerPos + roll) > 10){
				alert('Too far, roll again!');
				return
			} else {
				var playerPos = parseInt(player.position);
				console.log('started at ' + player.position);

				var nextPos = playerPos + roll;
				player.position = nextPos;
				console.log('now at ' + nextPos);
				player.position = nextPos; //update current position
			}

			if($('.player-one[data="'+nextPos+'"]').hasClass('defense')){
				$('#roll-click').off();
				$('.roll-choice').off();
				$('#roll').addClass('myhidden');
				defenseItem();
				console.log('this spot')
			};

			if((playerPos + roll) == 10){
				$('#roll-click').off();
				$('.roll-choice').off();
				$(document).off('click', '#select-consume');
				$(document).off('click', '#select-fire');
				$(document).off('click', '#select-smash');
				$('#action-view').empty();
				$('#action-view').append($('<div class="defense-option">'));
				$('.defense-option').append($('<h1 class="defense-announcement">').html('Final Battle Good Luck!'));
				startMinigame(player, enemy, 2);
				setTimeout(function(){
					$('.defense-option').remove();
				}, 3000)
				return;
			}

			if(($('.player-one[data="'+nextPos+'"]').hasClass('boss')) && ((playerPos + roll) != 10)){
				$('#roll-click').off();
				$('.roll-choice').off();
				$(document).off('click', '#select-consume');
				$(document).off('click', '#select-fire');
				$(document).off('click', '#select-smash');
				$('#action-view').append($('<div class="defense-option">'));
				$('.defense-option').append($('<h1 class="defense-announcement">').html('First Battle!'));
				startMinigame(player, enemy, 0);
				setTimeout(function(){
					$('.defense-option').remove();
				}, 3000)
				return;
			}

			if(playerPos == 0){ //Opening move
				for(i=0;i<roll;i++){
					$('.player-one[data="'+i+'"]').css({
					'background-image' : 'none',
					'background-size' : '50px 50px',
					'background-color' : '#777'
					});
				}
				player.position = roll; //update current position

				$('.player-one[data="'+roll+'"]').css({ //Update current tile background-image
					'background-image' : 'url('+player.image+')',
					'background-size' : '50px 50px'
				});
			} else{ //After opening move
				for(i=playerPos;i<nextPos;i++){
					$('.player-one[data="'+i+'"]').css({
						'background-image' : 'none',
						'background-size' : '50px 50px',
						'background-color' : '#777'
					});
				}

				$('.player-one[data="'+nextPos+'"]').css({  //Update current tile background-image
					'background-image' : 'url('+player.image+')',
					'background-size' : '50px 50px'
				});
			}
			$('.roll-choice[data="1"]').html('Press');
			$('.roll-choice[data="2"]').html('Roll');
			$('.roll-choice[data="3"]').html('Button');

			if (empty.indexOf(nextPos) != -1) {
				$(document).off('click', '#select-consume');
				$(document).off('click', '#select-fire');
				$(document).off('click', '#select-smash');
				$('#roll-click').off();
				$('.roll-choice').off();
				updater.allStats(player.attack, player.health, player.defense, player.position, player.ROF);
				console.log('empty spot');
			}
		});


		$(document).on('click', '#select-consume', function(){
			$('.defense-option').remove();
			console.log('consume clicked!')
			$('#roll-click').off();
			$('.roll-choice').off();
			$(document).off('click', '#select-consume');
			$(document).off('click', '#select-fire');
			$(document).off('click', '#select-smash');
			var health =  $('#player-health').html();
			health = (parseInt(health) + 500);
			$('#player-health').html(health);
			console.log(health)
			console.log(player)
			updater.allStats(player.attack, health, player.defense, player.position, player.ROF);
		});

		$(document).on('click', '#select-smash', function(){
			console.log('smash clicked')
			$('#roll-click').off();
			$('.roll-choice').off();
			$(document).off('click', '#select-smash');
			$(document).off('click', '#select-consume');
			$(document).off('click', '#select-fire');
			var health =  $('#player-health').html();
			health = (parseInt(health) + 5);
			var defense = $('#player-defense').html();
			defense = (parseInt(defense) + 5);
			var attack = $('#player-attack').html();
			attack = (parseInt(attack) + 5);

			$('#player-health').html(health);
			$('#player-defense').html(defense);
			$('#player-attack').html(attack);
			$('.defense-option').remove();
			console.log(health)
			console.log(player.position)
			console.log(attack)
			console.log(defense)
			updater.allStats(attack, health, defense, player.position, player.ROF);
		});

		$(document).on('click', '#select-fire', function(){
			$('.defense-option').remove();
			console.log('consume clicked!')
			$('#roll-click').off();
			$('.roll-choice').off();
			$(document).off('click', '#select-consume');
			$(document).off('click', '#select-fire');
			$(document).off('click', '#select-smash');
			var rof = (parseInt(player.ROF) + 10);
			$('#player-rof').html(rof);
			updater.allStats(player.attack, player.health, player.defense, player.position, rof);
		});
	} else if ((playerOne && !playerOneTurn) || (!playerOne && playerOneTurn)) { //this condition handles the wait until the enemy turn is over.
		$('#roll').addClass('myhidden');
		waitAndCheck(turn);
	}
	});
};

function waitAndCheck(prevTurn) {
	$.ajax({
		dataType: 'json',
		url: '/api/game',
		method: 'GET'})
	.done(function(response) {
		console.log('waiting...')
		if (response.playerOne.position == 99 || response.playerTwo.position == 99 ) {
			$('#action-view').empty();
			$('#action-view').append($('<div class="defense-option">'));
			$('.defense-option').append($('<h1 class="defense-announcement">').html('<h2>Game is Over!</h2>'));
			setTimeout(function(){
				location.href = "/stats"
			}, 3000)
		}
		if (response.currentMove != prevTurn) {
			$('#action-view').empty();
			update(false);
		} else {
			$('.defense-option').remove();
			if (dots.length == 3) {
				dots = '';
			} else {
				dots += '.'
			}
			$('#action-view').append($('<div class="defense-option">')).append($('.defense-option').append($('<h1 class="defense-announcement">').html('Waiting for player two to finish their turn'+ dots)))
			setTimeout(waitAndCheck.bind(null, prevTurn), 650)
		}
	});
};


jQuery(document).ready(function () {
	setTimeout( "jQuery('#loading_mask').fadeOut(600);", 1000 );
});

window.addEventListener("keydown", function(e) {
// space and arrow keys
if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
	e.preventDefault();
}
}, false);
