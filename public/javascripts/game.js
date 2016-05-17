$(document).ready(function(){
	//Creates the canvas
	var canvas = document.createElement('canvas');
	canvas.setAttribute('id', 'map-view');
	var ctx = canvas.getContext('2d');
	canvas.width = 900;
	canvas.height = 200;
	var canvasContainer = document.getElementById('map-view-container');
	canvasContainer.appendChild(canvas);

	//Game Objects
	var playerOne = {
		x: 0,
		y: 0
	};
	var playerTwo = {
		x: 0,
		y: 0
	};

	//Background Image
	var bgReady = false;
	var bgImage = new Image();
	bgImage.onload = function(){
		bgReady = true;
	};

	//Hero Image
	var playerOne = false;
	var playerOneImage = new Image();
	playerOneImage.onload = function(){
		playerOne = true;
	};
	playerOneImage.src = "";

	var playerTwo = false;
	var playerTwoImage = new Image();
	playerTwoImage.onload = function(){
		playerTwo = true;
	};
	playerTwoImage.src = "assets/images/hero.png";


	bgImage.src = "images/static-background.png"; //File path is relative to INDEX.HTML, not app.js
	function render(){
		if (bgReady) {
				ctx.drawImage(bgImage, 0, 0);
			}
		if (playerOne) {
				ctx.drawImage(playerOneImage, playerOne.x, playerOne.y);
		}
		if (playerTwo) {
				ctx.drawImage(playerTwoImage, playerTwo.x, playerTwo.y);
		}
	};

		var main = function(){
		render();
		requestAnimationFrame(main);
	}

	main();
});