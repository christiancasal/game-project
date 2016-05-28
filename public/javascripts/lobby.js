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
    			if (response[i].gameId == host) {
    				if (response[i].available == false && response[i].playerOne) {
    					location.href = "/game/start"
    				};
    			}
    			if (response[i].gameId != host && response[i].available) {
    				if ($('#' + response[i].gameId).length == 0) {
    					var link = $('<p class="game" id="' + response[i].gameId + '">' + response[i].playerTwo.name + '<a href="game/join/' + response[i].gameId + '">JOIN GAME</a></p>');
    					$('#available').append(link);
    				}
    			} else if (!response[i].available && response[i].playerOne == undefined) {
    				if ($('#' + response[i].gameId).length =! 0) {
    					$('#' + response[i].gameId).remove();
    				}
                } else if (!response[i].available && response[i].playerOne != undefined) {
                    if ($('#' + response[i].gameId).length == 0) {
    				    var active = $('<p class="nogame" id="' + response[i].gameId + '">' + response[i].playerTwo.name + ' VS ' + response[i].playerOne.name + '</p>');
                        $('#unavailable').append(active);
                    }
    			}
    		};
    		$('.game').each(function(index){
    			if (allGames.indexOf(Number($(this).attr('id'))) == -1) {
    				$(this).remove();
    			}
    		})

	    });
	 setTimeout(ajaxBuild, 5000);
	}());
    (function chatroom(){
        $.ajax({
            dataType: 'json',
            url: '/api/lobbychat',
            cache: false,
            method: 'GET'})
            .done(function(response) {
            for (var i = 0; i < response.length; i++) {
                console.log(response)
                identifier = String(moment(response[i].time).format('MMMM Do YYYY, h:mm:ss a') + response[i].username);
                identifier = identifier.replace(/[,:\s]+/g, '');

                if ($('#'+ identifier).text().length == 0) {
                    $('#messageBoard-lobby').append('<div class="_msgblock"><div class="_username" id="'+ identifier +'">' +response[i].username+'</div><div class="_message">' + response[i].message + '</div><div class="_timestamp">' + moment(response[i].time).format('MMMM Do YYYY, h:mm:ss a') + '</div><div class="clearfix"></div></div>');
                }
            }
        })
        setTimeout(chatroom, 5000);
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
