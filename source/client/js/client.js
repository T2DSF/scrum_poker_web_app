(function() {

	var socket;

	var server = {
		connect: function() {
			var self = this;

			// if(window.location.href.indexOf("t2dsf.com") < 0){
				//t2dsf.com is not in the domain, it's local
				socket = io.connect('http://localhost:8020');	
			// }else{
				//we're live
				// socket = io.connect('http://t2d-scrumpoker-app.nodejitsu.com:80');
			// }
			// socket events for the initial connection
			socket.on('connect', function() {
				if(PokerServer.clientType === "dealer") {
					socket.emit('startTable', { playerData: PokerServer.playerData });
				} else if(PokerServer.clientType === "player") {
					socket.emit('joinTable', { tableId: PokerServer.tableId, playerData: PokerServer.playerData });
				}
			});
			socket.on('tableConnect', function(tableId, players) {
				if(PokerServer.clientType === "dealer") {
					PokerServer.tableId = tableId;
				}
				PokerServer.players = players;
				PokerServer.connectCallback(players);
			});

			// socket event handlers for the issue voting events
			socket.on('handBegin', function(currentIssue) {
				if(PokerServer.handBeginCallback !== undefined) {
					PokerServer.handBeginCallback(currentIssue);
				}
			});
			socket.on('handProgress', function(progress) {
				if(PokerServer.handProgressCallback !== undefined) {
					PokerServer.handProgressCallback(progress);
				}
			});
			socket.on('handComplete', function(handData) {
				if(PokerServer.handCompleteCallback !== undefined) {
					PokerServer.handCompleteCallback(handData);
				}
			});
			
			// socket event handlers for the table events
			socket.on('playerDataUpdate', function(playerUpdateData) {
				delete PokerServer.players[playerUpdateData.oldData.name];
				PokerServer.players[playerUpdateData.newData.name] = playerUpdateData.newData;

				if(PokerServer.playerDataUpdateCallback !== undefined) {
					PokerServer.playerDataUpdateCallback(playerUpdateData);
				}
			});
			socket.on('playerConnect', function(playerData) {
				PokerServer.players[playerData.name] = playerData;

				if(PokerServer.playerConnectCallback !== undefined) {
					PokerServer.playerConnectCallback(playerData);
				}
			});
			socket.on('playerDisconnect', function(playerData) {
				console.log('playerDisconnect', playerData);
				delete PokerServer.players[playerData.name];
				
				if(PokerServer.playerDisconnectCallback !== undefined) {
					PokerServer.playerDisconnectCallback(playerData);
				}
			});
		},
		startHand: function() {
			socket.emit('startHand', { tableId: PokerServer.tableId });
		},
		endHand: function() {
			socket.emit('endHand', { tableId: PokerServer.tableId });
		},
		showHand: function(value) {
			socket.emit('showHand', { tableId: PokerServer.tableId, name: PokerServer.playerName, handValue: value });
		},
		updatePlayerInfo: function(playerData) {
			socket.emit('updatePlayerInfo', { tableId: PokerServer.tableId, playerData: playerData })
		},
		leaveTable: function(playerData) {
			socket.emit('playerLeaving', { tableId: PokerServer.tableId, playerData: playerData })
		}
	};

	var PokerServer = {
		clientType: undefined,
		tableId: undefined,

		connectCallback: undefined,
		handProgressCallback: undefined,
		handCompleteCallback: undefined,
		handBeginCallback: undefined,
		playerInfoUpdateCallback: undefined,
		playerConnectCallback: undefined,

		playerData: undefined,
		players: {},
		
		// API to start server connection depending on client role
		// completeCallback(playerData)
		// playerData = { players: [ { name: "" }, ... ] }

		// the completeCallback will return any currently connected players

		createNewPokerTable: function(playerName, completeCallback) {
			this.connectCallback = completeCallback;
			this.clientType = "dealer";
			this.playerName = playerName;
			this.playerData = { name: playerName };
			server.connect();
		},
		joinPokerTable: function(tableId, playerName, completeCallback) {
			this.connectCallback = completeCallback;
			this.clientType = "player";
			this.playerName = playerName;
			this.playerData = { name: playerName };
			this.tableId = tableId;
			server.connect();
		},
		leaveTable: function() {
			server.leaveTable(this.playerData);
		},

		// API to emit dealer and player actions to the server
		dealer: {
			startHand: function() {
				server.startHand();
			},
			endHand: function() {
				server.endHand();
			}
		},
		player: {
			showHand: function(value) {
				server.showHand(value);
			},
			updatePlayerName: function(playerName) {
				var oldData = PokerServer.playerData;
				delete PokerServer.players[PokerServer.playerName];

				PokerServer.playerName = playerName;
				PokerServer.playerData = { name: playerName };

				PokerServer.players[playerName] = PokerServer.playerData;

				server.updatePlayerInfo(PokerServer.playerData);
			}
		},
		table: {
			getPlayers: function() {
				return PokerServer.players;
			}
		},

		// callback registration methods to receive events from the server
		handlePlayerDataUpdate: function(callback) {
			// callback(playerUpdateData)
			// playerUpdateData = { oldData: { name: "" }, newData: { name: "" } }

			this.playerDataUpdateCallback = callback;
		},
		handlePlayerConnectCallback: function(callback) {
			// callback(playerData)
			// playerData = { name: "" }

			this.playerConnectCallback = callback;
		},
		handlePlayerDisconnectCallback: function(callback) {
			// callback(playerData)
			// playerData = { name: "" }

			this.playerDisconnectCallback = callback;
		},
		handleHandProgressCallback: function(callback) {
			// callback(progressPercent)
			// progressPercent = #

			this.handProgressCallback = callback;
		},
		handleHandCompleteCallback: function(callback) {
			// callback(handData)
			// handData = { players: [ { name: "", score: # }, ... ], average: # } 

			// the callback returns an object with a players array containing names and scores
			// the average is also returned for convienience
			this.handCompleteCallback = callback;
		},
		handleHandBeginCallback: function(callback) {
			// callback(currentIssue)
			// currentIssue = #

			this.handBeginCallback = callback;
		}
	};

	window.PokerServer = PokerServer;
	return PokerServer;
	
})();