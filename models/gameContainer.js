var gamesObject = {
	activeGames: [ 
		{
			gameId : 5362,
			available: true,
			currentMove: 0,
			playerTwo : {
				name: "night_slayer",
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				position: undefined
			},
			playerOne : {
				name: undefined,
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				position: undefined
			}
		},
		{
			gameId : 34521,
			available: false,
			currentMove: 0,
			playerTwo : {
				name: "Spider_dude",
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				position: undefined
			},
			playerOne : {
				name: "Funtimezzz123",
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				position: undefined
			}
		},
		{
			gameId : 13413,
			available: true,
			currentMove: 0,
			playerTwo : {
				name: "Martin-xXxXx",
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				position: undefined
			},
			playerOne : {
				name: undefined,
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				position: undefined
			}
		}
	],
	newGame : function(player, img, hth, atk, def){
		var ID = Math.floor(Math.random() * 1000) + 1 
		this.activeGames.push(
			{
				gameId : ID,
				available: true,
				currentMove: 0,
				playerTwo : {
					name: player,
					image: img,
					health: hth,
					attack: atk,
					defense: def,
					position: undefined
				}
			}
		);
		return ID;

	},
	joinGame : function(ID, player, img, hth, atk, def){
		for (var i = 0; i < this.activeGames.length; i++) {
			if (this.activeGames[i].gameId == ID && this.activeGames[i].available == true) {
				this.activeGames[i].available = false;
				this.activeGames[i].playerOne = {
					name: player,
					image: img,
					health: hth,
					attack: atk,
					defense: def,
					position: undefined
				}
			}
		}
		console.log('Successfully joined game')
	},
	endGame : function(ID){
		for (var i = 0; i < this.activeGames.length; i++) {
			if (this.activeGames[i].gameId == ID) {
				this.activeGames.splice(i, 1);
			}
		}
	}
};

module.exports = gamesObject;
