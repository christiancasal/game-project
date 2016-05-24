var gamesObject = {
	activeGames: [ 
		{
			gameId : 5362,
			available: true,
			currentMove: 0,
			map: 3,
			playerTwo : {
				name: "night_slayer",
				character: undefined,
				image: 'http://static.comicvine.com/uploads/original/6/62058/2013735-59654_bugs_bunny.jpg',
				health: 500,
				attack: 300,
				defense: 10,
				ROF: 1,
				board: [1,4,6,7],
				position: 0
			},
			playerOne : {
				name: undefined,
				character: undefined,
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				ROF: 1,
				board: undefined,
				position: undefined
			},
		},
		{
			gameId : 34521,
			available: false,
			currentMove: 0,
			playerTwo : {
				name: "Spider_dude",
				character: undefined,
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				ROF: 1,
				board: undefined,
				position: undefined
			},
			playerOne : {
				name: "Funtimezzz123",
				character: undefined,
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				ROF: 1,
				board: undefined,
				position: undefined
			}
		},
		{
			gameId : 13413,
			available: true,
			currentMove: 0,
			playerTwo : {
				name: "Martin-xXxXx",
				character: undefined,
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				ROF: 1,
				board: undefined,
				position: undefined
			},
			playerOne : {
				name: undefined,
				character: undefined,
				image: undefined,
				health: undefined,
				attack: undefined,
				defense: undefined,
				ROF: 1,
				board: undefined,
				position: undefined
			}
		}
	],
	newGame : function(player, char, img, hth, atk, def, rof){
		var ID = Math.floor(Math.random() * 5000) + 1;
		newBoardTwo = [];
		while(newBoardTwo.length < 4) {
		    var random_number = Math.round(Math.random()*(9 - 1) + 1);
		    if (newBoardTwo.indexOf(random_number) == -1) {
		        newBoardTwo.push(random_number);
		    }
		}
		var randomMap = Math.floor(Math.random() * (6 - 1)) + 1;

		this.activeGames.push(
			{
				gameId : ID,
				available: true,
				currentMove: 0,
				map: randomMap,
				playerTwo : {
					name: player,
					character: char,
					image: img,
					health: hth,
					attack: atk,
					defense: def,
					ROF: rof,
					board : newBoardTwo.sort(),
					position: 0
				}
			}
		);
		return ID;

	},
	joinGame : function(ID, player, char, img, hth, atk, def, rof){
		var newBoardOne = [];
		while(newBoardOne.length < 4) {
		    var random_number = Math.round(Math.random()*(9 - 1) + 1);
		    if (newBoardOne.indexOf(random_number) == -1) {
		        newBoardOne.push(random_number);
		    }
		}
		for (var i = 0; i < this.activeGames.length; i++) {
			if (this.activeGames[i].gameId == ID && this.activeGames[i].available == true) {
				this.activeGames[i].available = false;
				this.activeGames[i].playerOne = {
					name: player,
					character: char,
					image: img,
					health: hth,
					attack: atk,
					defense: def,
					ROF: rof,
					board : newBoardOne.sort(),
					position: 0
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
