$(document).ready(function(){
	var queryUrl = '/game/api/' + $('#host').text();
	console.log('***************** This is queryURL: ', queryUrl)
	$.ajax({
	    dataType: 'json',
	    url: queryUrl,
	    method: 'GET'})
	    .done(function(response) {
	    	console.log(response)
	    	// main(response.playerOne.img, response.playerOne.username)

	    });
});

function main(player1img, player1name) {

}
