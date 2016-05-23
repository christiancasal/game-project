//This code block seperates the different players at the start of the game
//================================================================================
$(document).ready(function(){
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
console.log(playerRef)
console.log(currentMove)
console.log(playerOne)
//=========================================
for (var i=0; i < 10; i++) {
	if (playerRef.board.indexOf(i) == -1) {
		empty.push(i);
	}
}
$('#player-health').html(playerRef.health);
$('#player-defense').html(playerRef.defense);
$('#player-attack').html(playerRef.attack);

$('#enemy-health').html(enemyRef.health);
$('#enemy-defense').html(enemyRef.defense);
$('#enemy-attack').html(enemyRef.attack);
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
	'background-image' : 'url(images/apocalypse.png)',
	'background-size' : '50px 50px'
});
$('.player-one[data="'+playerRef.board[1]+'"]').addClass('boss');

$('.player-one[data="10"]').css({
	'background-image' : 'url(images/apocalypse.png)',
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
	'background-image' : 'url(images/apocalypse.png)',
	'background-size' : '50px 50px'
});
$('.player-two[data="'+enemyRef.board[1]+'"]').addClass('boss');

$('.player-two[data="10"]').css({
	'background-image' : 'url(images/apocalypse.png)',
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
})
}


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

if (player.position == 10) {
	console.log('game is over. youre at the end')
}

function diceRoll(min, max) {
	for(i=1;i<=3;i++){
		var min = 1;
		var max = 4;
		var roll = Math.floor(Math.random() * (max - min)) + min;
		$('.roll-choice[data="'+i+'"]').html(roll);
	}
};

function defenseItem(){
	$('#action-view').empty();
	$('#action-view').append($('<div class="defense-option">'));
	$('.defense-option').append($('<h1 class="defense-announcement">').html('Select CONSUME or SMASH!'));
	$('.defense-option').append($('<p class="defense-announcement">').html('Consuming adds 20pts to this items specialty, smashing adds 5 to all attributes'));
	$('.defense-option').append($('<button id="select-consume">').html('CONSUME'));
	$('.defense-option').append($('<button id="select-smash">').html('SMASH'));
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
var playerPos = parseInt(player.position);
console.log('started at ' + player.position);

var nextPos = playerPos + roll;
player.position = nextPos;
console.log('now at ' + nextPos);

for (var i = 0; i < empty.length; i++) {
	if (empty.indexOf(nextPos) == 1) {

	}
}
if($('.player-one[data="'+nextPos+'"]').hasClass('defense')){
	$('#roll-click').off();
	$('.roll-choice').off();
	$('#roll').addClass('myhidden');
	defenseItem();
};

if((playerPos + roll) == 10){
	$('.roll-choice').off();
	$('#action-view').empty();
	$('#action-view').append($('<div class="defense-option">'));
	$('.defense-option').append($('<h1 class="defense-announcement">').html('Final Battle Good Luck!'));
	setTimeout(function(){
		$('.defense-option').empty();
	}, 3000)
}

if((playerPos + roll) > 10){
	alert('Too far, roll again!');
	return
}

if($('.player-one[data="'+nextPos+'"]').hasClass('boss')){
	$('#roll-click').off();
	$('.roll-choice').off();
	$(document).off('click', '#select-consume');
	$(document).off('click', '#select-smash');
	startMinigame(player, enemy);
	console.log('im back in here =]')
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

}
else{ //After opening move
	for(i=playerPos;i<nextPos;i++){
		$('.player-one[data="'+i+'"]').css({
			'background-image' : 'none',
			'background-size' : '50px 50px',
			'background-color' : '#777'
		});
	}

player.position = nextPos; //update current position

$('.player-one[data="'+nextPos+'"]').css({  //Update current tile background-image
	'background-image' : 'url('+player.image+')',
	'background-size' : '50px 50px'
});

}

$('.roll-choice[data="1"]').html('Press');
$('.roll-choice[data="2"]').html('Roll');
$('.roll-choice[data="3"]').html('Button');
});

$(document).on('click', '#select-consume', function(){
	console.log('consume clicked!')
	$('#roll-click').off();
	$('.roll-choice').off();
	$(document).off('click', '#select-consume');
	$(document).off('click', '#select-smash');
	var health =  $('#player-health').html();
	health = (parseInt(health) + 20);
	$('#player-health').html(health);
	$('.defense-option').remove();
	console.log(health)
	console.log(player)
	updater.allStats(player.attack, health, player.defense, player.position);
});

$(document).on('click', '#select-smash', function(){
	console.log('smash clicked')
	$('#roll-click').off();
	$('.roll-choice').off();
	$(document).off('click', '#select-smash');
	$(document).off('click', '#select-consume');
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
	updater.allStats(attack, health, defense, player.position);
});

} else if ((playerOne && !playerOneTurn) || (!playerOne && playerOneTurn)) { //this condition handles the wait until the enemy turn is over.
	$('#roll').addClass('myhidden');
	waitAndCheck(turn);	
}
})

function waitAndCheck(prevTurn) {
	$.ajax({
		dataType: 'json',
		url: '/api/game',
		method: 'GET'})
	.done(function(response) {
		console.log('waiting...')
		if (response.currentMove != prevTurn) {
			$('#action-view').empty();
			update(false);
		} else {
			$('.defense-option').empty();
			if (dots.length == 3) {
				dots = '';
			} else {
				dots += '.'
			}

			$('#action-view').append($('<div class="defense-option">')).append($('.defense-option').append($('<h1 class="defense-announcement">').html('Waiting for player two to finish their turn'+ dots)))
			setTimeout(waitAndCheck.bind(null, prevTurn), 1000)
		}

	})
}
};

jQuery(document).ready(function () {
	setTimeout( "jQuery('#loading_mask').fadeOut(600);", 1000 );
});







