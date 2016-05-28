var gamesObject = {
	activeGames: [
		{
			gameId : 5362,
			available: true,
			currentMove: 0,
			map: 3,
			chat: [],
			playerTwo : {
				id : undefined,
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
				id :undefined,
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
			map: 2,
			chat: [],
			playerTwo : {
				id : undefined,
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
				id : undefined,
				name: "night_slayer",
				character: undefined,
				image: 'http://static.comicvine.com/uploads/original/6/62058/2013735-59654_bugs_bunny.jpg',
				health: 500,
				attack: 300,
				defense: 10,
				ROF: 1,
				board: [1,4,6,7],
				position: 0
			}
		},
		{
			gameId : 13413,
			available: true,
			currentMove: 0,
			map: 4,
			chat: [],
			playerTwo : {
				id : undefined,
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
				id :undefined,
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
	lobbyChat : [
		{
			username: 'Ricky',
			message: 'Hi guys',
			time : 'Wed May 25 2016 23:00:41 GMT-0400 (EDT)'
		}
	],
	newGame : function(player, char, img, hth, atk, def, rof, userID){
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
				available: false,
				currentMove: 0,
				map: randomMap,
				chat: [],
				playerTwo : {
					id : userID,
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
	joinGame : function(ID, player, char, img, hth, atk, def, rof, userID){
		var newBoardOne = [];
		while(newBoardOne.length < 4) {
		    var random_number = Math.round(Math.random()*(9 - 1) + 1);
		    if (newBoardOne.indexOf(random_number) == -1) {
		        newBoardOne.push(random_number);
		    }
		}
		for (var i = 0; i < this.activeGames.length; i++) {
			if (this.activeGames[i].gameId == ID && this.activeGames[i].playerOne == undefined) {
				this.activeGames[i].available = false;
				this.activeGames[i].playerOne = {
					id : userID,
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
