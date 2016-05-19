$(document).ready(function(){
	var host = $('#host').text();
	(function ajaxBuild(){

		$.ajax({
			dataType: 'json',
	    	url: '/game/api',
	    	cache: false,
	    	method: 'GET'})
	    	.done(function(response) {
    		var allGames = [];
    		for (var i = 0; i < response.length; i++) {
    			allGames.push(response[i].gameId)
    		};
    		for (var i = 0; i < response.length; i++) {
    			if (response[i].gameId == host) {
    				if (response[i].available == false) {
    					location.href = "/game/start"
    				};
    			}
    			if (response[i].gameId != host && response[i].available) {
    				if ($('#' + response[i].gameId).length == 0) {
    					var link = $('<p class="game" id="' + response[i].gameId + '">User: ' + response[i].playerOne.name + '<a href="game/join/' + response[i].gameId + '">Join Game</a></p>');
    					$('#available').append(link);
    				}
    			} else if (!response[i].available) {
    				if ($('#' + response[i].gameId).length =! 0) {
    					$('#' + response[i].gameId).remove();
    				}
    				var active = $('<p class="game" id="' + response[i].gameId + '">User ' + response[i].playerOne.name + ' VS ' + response[i].playerTwo.name + '</p>');
    				$('#unavailable').append(active);
    			}
    		};
    		$('.game').each(function(index){
    			if (allGames.indexOf(Number($(this).attr('id'))) == -1) {
    				$(this).remove();
    			}
    		})

	    });
	 setTimeout(ajaxBuild, 1000);
	}());
});