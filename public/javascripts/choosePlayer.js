$(document).ready(function(){
	var charDiv = $('#current-char');

	$('.character').on('click', function(){
		// $('#current-char').empty();
		$('#char-name').html('<h3>' + $(this).data('name') + '</h3>');
		$('#char-health').html('<p>Health: ' + $(this).data('health') + '</p>');
		$('#char-attack').html('<p>Attack: ' + $(this).data('attack') + '</p>');
		charPic = $('<img>').attr('src', $(this).attr('src'));
		$('#char-picture').html(charPic);
	})
})