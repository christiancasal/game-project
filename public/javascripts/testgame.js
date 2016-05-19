$(document).ready(function(){
	//This code block seperates the different players at the start of the game
	//=========================================
	if ($('#player').text() == "true") {
		playerOne = true;
	} else {
		playerOne = false;
	};
	//=========================================
	var queryUrl = '/api/' + $('#host').text();
	$.ajax({
	    dataType: 'json',
	    url: queryUrl,
	    method: 'GET'})
	    .done(function(initRes) {
	    	//This sets up the references to player objects for each player
	    	//=========================================
	    	if (playerOne) {
	    		playerRef = initRes.playerOne;
	    		enemyRef = initRes.playerTwo;
	    	} else if (!playerOne) {
	    		playerRef = initRes.playerTwo;
	    		enemyRef = initRes.playerOne;
	    	}
	    	//=========================================
		main();
	});

	function newTurn(){ //This function updates currentMove in the shared database resulting in the end of the players turn.
		var queryUrl = '/api/move/' + $('#host').text();
		$.ajax({
		    dataType: 'text',
		    url: queryUrl,
		    method: 'GET'})
		.done(function(response) {
		    console.log(response)
		    main();
		})
	};

	var queryUrl = '/api/' + $('#host').text();
	function main(){	
    	$.ajax({
    	    dataType: 'json',
    	    url: queryUrl,
    	    method: 'GET'})
    	    .done(function(response) {
	    	if (response.currentMove % 2 == 0) { //This block decides whose turn it is based on the current move.
	    		playerOneTurn = true;			  //+
	    	} else {							  //+
	    		playerOneTurn = false;			  //+
	    	};									  //+

	    	if ((playerOne && playerOneTurn) || (!playerOne && !playerOneTurn)) { //This condition checks if it's either players turn. it's either player one's turn or player two's turn.
				console.log('You are ' + playerRef.name);
				console.log('Your enemy is ' + enemyRef.name);

	    		setTimeout(newTurn, 3000);
	    	} else if ((playerOne && !playerOneTurn) || (!playerOne && playerOneTurn)) { //this condition handles the wait until the enemy turn is over.
	    		setTimeout(main, 1000); 
	    	}
    	})
	};
});//Document ready close tag







