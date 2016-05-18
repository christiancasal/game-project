$(document).ready(function(){
	var queryUrl = '/game/api/' + $('#host').text();
	console.log(queryUrl)
	$.ajax({
	    dataType: 'json',
	    url: queryUrl,
	    method: 'GET'})
	    .done(function(response) {
	    	console.log(response.playerOne.img)
	    	console.log(response.playerOne.username)
	    })
});