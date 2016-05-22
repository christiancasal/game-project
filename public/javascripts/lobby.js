$(document).ready(function(){
    $("#loading_mask").hide();
	var host = $('#host').text();
	(function ajaxBuild(){

		$.ajax({
			dataType: 'json',
	    	url: '/api',
	    	cache: false,
	    	method: 'GET'})
	    	.done(function(response) {
    		var allGames = [];
    		for (var i = 0; i < response.length; i++) {
    			allGames.push(response[i].gameId)
    		};
    		for (var i = 0; i < response.length; i++) {
    			console.log('hi')
    			if (response[i].gameId == host) {
    				console.log(host)
    				console.log(response[i].available)
    				if (response[i].available == false) {
    					console.log('here')
    					location.href = "/game/start"
    				};
    			}
    			if (response[i].gameId != host && response[i].available) {
    				if ($('#' + response[i].gameId).length == 0) {
    					var link = $('<p class="game" id="' + response[i].gameId + '">User: ' + response[i].playerTwo.name + '<a href="game/join/' + response[i].gameId + '">Join Game</a></p>');
    					$('#available').append(link);
    				}
    			} else if (!response[i].available) {
    				if ($('#' + response[i].gameId).length =! 0) {
    					$('#' + response[i].gameId).remove();
    				}
    				var active = $('<p class="game" id="' + response[i].gameId + '">User ' + response[i].playerTwo.name + ' VS ' + response[i].playerTwo.name + '</p>');
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

// delegate all clicks on "a" tag (links)
$(document).on("click", "a[href*='join']", function () {

    // get the href attribute
    var newUrl = $(this).attr("href");

    // veryfy if the new url exists or is a hash
    if (!newUrl || newUrl[0] === "#") {
        // set that hash
        location.hash = newUrl;
        return;
    }

    // now, fadeout the html (whole page)
    $("#loading_mask").fadeIn(700,function () {
        // when the animation is complete, set the new location
        location = newUrl;
    });

    // prevent the default browser behavior.
    return false;
});