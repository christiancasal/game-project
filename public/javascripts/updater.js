var updater = {
	allStats : function(atk, hp, def, pos) { //This function updates the players stats in the shared database.
		var queryUrl = '/api/update/' + $('#host').text() + '/' + atk + '/' + hp + '/' + def + '/' + pos;
		$.ajax({
	    	dataType: 'text',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	console.log(response)
		})
	},
	health : function(hp) {
		var queryUrl = '/api/health/' + hp;
		$.ajax({
	    	dataType: 'text',
	    	url: queryUrl,
	    	method: 'GET'})
	    .done(function(response) {
	    	console.log(response)
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






