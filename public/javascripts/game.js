$(document).ready(function(){
	var queryUrl = '/game/api/' + $('#host').text();
	console.log('***************** This is queryURL: ', queryUrl)
	$.ajax({
	    dataType: 'json',
	    url: queryUrl,
	    method: 'GET'})
	    .done(function(response) {
	    	main(response.playerOne, response.playerTwo);
				console.log('*************** here *********************');
	    })
});

function main(playerOne, playerTwo) {
	var p1 = this. playerOne;
	var p2 = this.playerTwo;

	console.log('This is playerOne: ', p1);

	console.log('This is playerTwo: ', p2);
}
