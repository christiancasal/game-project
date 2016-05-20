$(document).ready(function(){
	var queryUrl = '/api/' + $('#host').text();
	console.log('***************** This is queryURL: ', queryUrl)
	$.ajax({
	    dataType: 'json',
	    url: queryUrl,
	    method: 'GET'})
	    .done(function(response) {
	    	console.log(response)

	    	main(response.playerOne, response.playerTwo);

				$('.player-one[data="0"]').css({
					'background-image' : 'url('+player_two.image+')',
					'background-size' : '50px 50px'
				});

				$('.player-two[data="0"]').css({
					'background-image' : 'url('+player_two.image+')',
					'background-size' : '50px 50px'
				});

				currentMove = response.currentMove;

	    });
});
var currentMove;
var player_one = {};
var player_two = {};

function main(playerOne, playerTwo) {
	player_one = playerOne;
	player_two = playerTwo;
	player_one.currentPos = 0;
	player_two.currentPos = 0;
}

function initRoll(min, max) { //WHO GOES FIRST
	var min = 1;
	var max = 3;
	var roll = Math.floor(Math.random() * (max - min)) + min;

	if(roll == 1){
		$('#action-anouncement').html('Player 1 wins the starting roll!');
	}else if(roll == 2){
		$('#action-anouncement').html('Player 2 wins the starting roll!');
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

initRoll();

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
			'background-image' : 'url('+player_two.image+')',
			'background-size' : '50px 50px'
		});

	}
	else{ //After opening move
		var nextPos = playerPos + roll;
		for(i=playerPos;i<nextPos;i++){
			$('.player-one[data="'+i+'"]').css({
				'background-image' : 'none',
				'background-size' : '50px 50px',
				'background-color' : '#777'
			});
		}

		player_one.currentPos = nextPos; //update current position

		$('.player-one[data="'+nextPos+'"]').css({  //Update current tile background-image
			'background-image' : 'url('+player_two.image+')',
			'background-size' : '50px 50px'
		});

	}

	$('.roll-choice[data="1"]').html('Press');
	$('.roll-choice[data="2"]').html('Roll');
	$('.roll-choice[data="3"]').html('Button');

});
