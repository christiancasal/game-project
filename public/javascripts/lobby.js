$(document).ready(function(){
	var host = $('#host').text();
	(function ajaxBuild(){
		$('#available').empty();
		$('#unavailable').empty();
		$.ajax({
			dataType: 'json',
	    	url: '/game/api',
	    	cache: false,
	    	method: 'GET'})
	    	.done(function(response) {
    		console.log(response);
    		for (var i = 0; i < response.length; i++) {
    			if (response[i].gameId != host && response[i].available) {
    				var link = $('<p>User: ' + response[i].playerOne.name + '<a href="game/join/' + response[i].gameId + '">Join Game</a></p>');
    				$('#available').append(link);
    			} else if (!response[i].available) {
    				console.log(response[i].playerOne.name)
    				var active = $('<p>User ' + response[i].playerOne.name + ' VS ' + response[i].playerTwo.name + '</p>');
    				$('#unavailable').append(active)
    			}
    		}
	    });
	 setTimeout(ajaxBuild, 1000)
	}());
});