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
	enemyStats : function(atk, hp, def, pos) { //This function updates the players stats in the shared database.
		var queryUrl = '/api/updateEnemy/' + atk + '/' + hp + '/' + def + '/' + pos;
		$.ajax({
	    	dataType: 'json',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	console.log('step two')
	    	update(false);
		})
	},
};






