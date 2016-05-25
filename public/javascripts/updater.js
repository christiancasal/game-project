var updater = {
	newTurn : function(){ //This function updates currentMove in the shared database resulting in the end of the players turn
		var queryUrl = '/api/move'
		$.ajax({
		    dataType: 'text',
		    url: queryUrl,
		    method: 'GET'})
		.done(function(response) {
		    console.log(response)
		    update(false);
		})
	},
	allStats : function(atk, hp, def, pos, rof) { //This function updates the players stats in the shared database.
		console.log(atk)
		console.log(hp)
		console.log(def)
		console.log(pos)
		var queryUrl = '/api/update/' + atk + '/' + hp + '/' + def + '/' + pos + '/' + rof;
		$.ajax({
	    	dataType: 'json',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	updater.newTurn();
		})
	},
	enemyStats : function(atk, hp, def, pos, rof) { //This function updates the players stats in the shared database.
		var queryUrl = '/api/updateEnemy/' + atk + '/' + hp + '/' + def + '/' + pos + '/' + rof;
		$.ajax({
	    	dataType: 'json',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	
		})
	},
};
