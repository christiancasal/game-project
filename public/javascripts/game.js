$(document).ready(function(){
	var queryUrl = '/game/api/' + $('#host').text();
	console.log('***************** This is queryURL: ', queryUrl)
	$.ajax({
	    dataType: 'json',
	    url: queryUrl,
	    method: 'GET'})
	    .done(function(response) {
	    	console.log(response)

	    	main(response.playerOne, response.playerTwo);

				$('.player-one[data="0"]').css({
					'background-image' : 'url('+player_one.image+')',
					'background-size' : '50px 50px'
				});

				$('#player-image').attr('src', player_one.image).css({
					'width' : '173px',
					'margin-top' : '5px'
				});
				$('#player-health').html(player_one.health);
				$('#player-defense').html(player_one.defense);
				$('#player-attack').html(player_one.attack);

				// $('.player-two[data="0"]').css({
				// 	'background-image' : 'url('+player_two.image+')',
				// 	'background-size' : '50px 50px'
				// });

				currentMove = response.currentMove;

	    });
});

var currentMove;
var player_one = {};
var player_two = {};

function main(playerOne, playerTwo) {
	player_one = playerOne;
	// player_two = playerTwo;
	player_one.currentPos = 0;
	// player_two.currentPos = 0;
}

function loadItems() {
	var limit = 4,
	    amount = 0,
	    lower_bound = 1,
	    upper_bound = 9,
	    itemsArray = [];

	if (amount > limit) {
		limit = amount;
	}
	while (itemsArray.length < limit) {
	    var random_number = Math.round(Math.random()*(upper_bound - lower_bound) + lower_bound);
	    if (itemsArray.indexOf(random_number) == -1) {
	        itemsArray.push(random_number);
	    }
	}
	console.log('This is itemsArray NOT sorted: ', itemsArray);
	itemsArray.sort();
	console.log('This is itemsArray sorted: ', itemsArray);

	$('.player-one[data="'+itemsArray[0]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="'+itemsArray[0]+'"]').addClass('defense');

	$('.player-one[data="'+itemsArray[2]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="'+itemsArray[2]+'"]').addClass('defense');

	$('.player-one[data="'+itemsArray[3]+'"]').css({
		'background-image' : 'url(images/defenseItem.png)',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="'+itemsArray[3]+'"]').addClass('defense');



	$('.player-one[data="'+itemsArray[1]+'"]').css({
		'background-image' : 'url(images/apocalypse.png)',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="'+itemsArray[1]+'"]').addClass('defense');

	$('.player-one[data="10"]').css({
		'background-image' : 'url(images/apocalypse.png)',
		'background-size' : '50px 50px'
	});
	$('.player-one[data="10"]').addClass('defense');

}

function initRoll(min, max) { //WHO GOES FIRST
	var min = 1;
	var max = 3;
	var roll = Math.floor(Math.random() * (max - min)) + min;

	if(roll == 1){
		// $('#action-anouncement').html('Player 1 wins the starting roll!');
	}else if(roll == 2){
		// $('#action-anouncement').html('Player 2 wins the starting roll!');
	}else{
		console.log('weird, this was roll: ', roll);
	}
}

function diceRoll(min, max) {
	for(i=1;i<=3;i++){
		// debugger;
		var min = 1;
		var max = 4;
		var roll = Math.floor(Math.random() * (max - min)) + min;
		$('.roll-choice[data="'+i+'"]').html(roll);
	}
}

function defenseItem(){
	debugger;
	$('#action-view').append($('<div class="defense-option">'));
	$('.defense-option').append($('<h1 class="defense-announcement">').html('Select CONSUME or SMASH!'));
	$('.defense-option').append($('<p class="defense-announcement">').html('Consuming adds 20pts to this items specialty, smashing adds 5 to all attributes'));

}

initRoll();
loadItems();

$('#roll-click').on('click', function(){
	// debugger;
	diceRoll();
});

$('.roll-choice').on('click', function(){
	var num = $(this).html();
	var roll = parseInt(num);
	// debugger;
	if(isNaN(roll)){ //if select "Press" || "Roll" || "Button"
		diceRoll();
		return
	}

	var playerPos = parseInt(player_one.currentPos);
	var nextPos = playerPos + roll;

	if((playerPos + roll) > 10){
		alert('You win.');
		return
	}

	if($('.player-one[data="'+nextPos+'"]').hasClass('defense')){
		defenseItem();
	}

	if(playerPos == 0){ //Opening move
		for(i=0;i<roll;i++){
			$('.player-one[data="'+i+'"]').css({
				'background-image' : 'none',
				'background-size' : '50px 50px',
				'background-color' : '#777'
			});
		}
		player_one.currentPos = roll; //update current position

		$('.player-one[data="'+roll+'"]').css({ //Update current tile background-image
			'background-image' : 'url('+player_one.image+')',
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

		player_one.currentPos = nextPos; //update current position

		$('.player-one[data="'+nextPos+'"]').css({  //Update current tile background-image
			'background-image' : 'url('+player_one.image+')',
			'background-size' : '50px 50px'
		});

	}

	$('.roll-choice[data="1"]').html('Press');
	$('.roll-choice[data="2"]').html('Roll');
	$('.roll-choice[data="3"]').html('Button');

});

$('#reset').on('click', function(){
	for(i=1;i<=player_one.currentPos;i++){
		$('.player-one[data="'+i+'"]').css({
			'background-image' : 'none',
			'background-size' : '50px 50px',
			'background-color' : '#FFF'

		});
	}

	player_one.currentPos = 0;

	$('.player-one[data="'+0+'"]').css({ //Update current tile background-image
		'background-image' : 'url('+player_one.image+')',
		'background-size' : '50px 50px'
	});
});
