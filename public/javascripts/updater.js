var updater = {
	newTurn : function(){ //This function updates currentMove in the shared database resulting in the end of the players turn
		console.log('step three')
		var queryUrl = '/api/move'
		$.ajax({
		    dataType: 'text',
		    url: queryUrl,
		    method: 'GET'})
		.done(function(response) {
			console.log('step four')
		    console.log(response)
		    update(false);
		})
	},
	gameBoard : function(board) {
		var queryUrl = '/api/board/' + board[0] + '/' + board[1] + '/' + board[2] + '/' + board[3];
		$.ajax({
	    	dataType: 'json',
	    	url: queryUrl,
	    	async: false,
	    	method: 'GET'})
	    .done(function(response) {
	    	if (response[0].failed) {
	    		updater.gameBoard(board);
	    	} else {
	    		console.log('These should be first')
	    	}
	    })	
	},
	allStats : function(atk, hp, def, pos) { //This function updates the players stats in the shared database.
		console.log('step one')
		console.log(atk)
		console.log(hp)
		console.log(def)
		console.log(pos)
		var queryUrl = '/api/update/' + atk + '/' + hp + '/' + def + '/' + pos;
		$.ajax({
	    	dataType: 'json',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	console.log('step two')
	    	updater.newTurn();
		})
	},
	health : function(hp) {
		var queryUrl = '/api/health/' + hp;
		$.ajax({
	    	dataType: 'json',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	console.log(response.status)
	    	updater.newTurn();
		})
	},
	attack : function(atk) {
		var queryUrl = '/api/attack/' + atk;
		$.ajax({
	    	dataType: 'text',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	console.log(response)
		})
	},
	defense : function(def) {
		var queryUrl = '/api/defense/' + def;
		$.ajax({
	    	dataType: 'text',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	console.log(response)
		})
	},
	position : function(pos) {
		var queryUrl = '/api/position/' + pos;
		$.ajax({
	    	dataType: 'text',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	console.log(response)
		})
	}
};






