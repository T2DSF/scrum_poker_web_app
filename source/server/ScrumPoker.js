var ScrumPoker = {
	pokerTables: {},
	socket: undefined,
	clients: {},
	init: function(socket) {
		console.log("init ScrumPoker");
		ScrumPoker.socket = socket;
	},
	startTable: function(socket, playerData) {
		var tableId = ScrumPoker.buildTable(socket.id);
		ScrumPoker.joinTable(socket, tableId, playerData);
	},
	joinTable: function(socket, tableId, playerData) {
		if(ScrumPoker.pokerTables.hasOwnProperty(tableId)) {
			socket.join(tableId);
			ScrumPoker.pokerTables[tableId].addPlayer(socket, playerData);
			socket.emit('tableConnect', tableId, ScrumPoker.pokerTables[tableId].players);
			ScrumPoker.clients[socket.id] = tableId;
			ScrumPoker.socket.in(tableId).emit('playerConnect', ScrumPoker.pokerTables[tableId].players);
		} else {
			socket.emit('tableError', { type: "invalidId", message: "There is no table with the ID " + tableId });
		}
	},
	leaveTable: function(socket) {
		if(ScrumPoker.clients.hasOwnProperty(socket.id)) {
			var tableId = ScrumPoker.clients[socket.id];
			var playerData = ScrumPoker.pokerTables[tableId].removePlayer(socket);
			socket.leave(tableId);
			ScrumPoker.socket.in(tableId).emit('playerDisconnect', playerData);
		}
	},
	updatePlayerData: function(socket, tableId, oldPlayerData, newPlayerData) {
		var playerData = ScrumPoker.pokerTables[tableId].removePlayer(socket);
		ScrumPoker.pokerTables[tableId].addPlayer(socket, newPlayerData);
		ScrumPoker.socket.in(tableId).emit('playerDataUpdate', { oldData: oldPlayerData, newData: newPlayerData });
	},
	startHand: function(socket, tableId) {
		if(ScrumPoker.pokerTables[tableId].dealerId === socket.id) {
			ScrumPoker.pokerTables[tableId].handData = [];
			ScrumPoker.pokerTables[tableId].currentIssue ++;
			ScrumPoker.pokerTables[tableId].issueProgress = 0;
			ScrumPoker.socket.in(tableId).emit('handBegin', {
				currentIssue: ScrumPoker.pokerTables[tableId].currentIssue
			});
		} else {
			socket.emit('tableError', { type: "invalidPlayerType", message: "Nice try, only the dealer can start the hand." });
		}
	},
	showHand: function(socket, tableId, name, handValue) {
		ScrumPoker.pokerTables[tableId].issueProgress ++;
		ScrumPoker.pokerTables[tableId].handData.push({ name: name, handValue: handValue });
		ScrumPoker.socket.in(tableId).emit('handProgress', {
			issueProgress: ScrumPoker.pokerTables[tableId].issueProgress / ScrumPoker.pokerTables[tableId].playerCount
		});
	},
	endHand: function(socket, tableId) {
		if(ScrumPoker.pokerTables[tableId].dealerId === socket.id) {
			var average = 0,
				count = ScrumPoker.pokerTables[tableId].handData.length;

			for(var i = 0; i < count; i ++) {
				average += ScrumPoker.pokerTables[tableId].handData[i].handValue;
			}
			average = Math.floor(average / count);

			ScrumPoker.socket.in(tableId).emit('handComplete', {
				players: ScrumPoker.pokerTables[tableId].handData,
				average: average
			});
		} else {
			socket.emit('tableError', { type: "invalidPlayerType", message: "Nice try, only the dealer can end the hand." });
		}
	},


	buildTable: function(dealerId) {
		var id = "";

	    var charset = "ABCDEFGHJKMNPQRSTUVWXYZ23456789";

	    for( var i=0; i < 4; i++ ) {
	        id += charset.charAt(Math.floor(Math.random() * charset.length));
	    }

		ScrumPoker.pokerTables[id] = new Table(id);
		ScrumPoker.pokerTables[id].dealerId = dealerId;
		return id;
	}
};

var Table = function(tableId, dealerId) {
	this.players = [];
	this.dealerId = dealerId;
	this.tableId = tableId;
	this.handData = [];
	this.currentIssue = 0;
	this.issueProgress = 0;
};

Table.prototype.addPlayer = function(socket, playerData) {
	var player = new Player(playerData, socket.id);
	this.players.push(player);
	this.playerCount = this.players.length;
};

Table.prototype.removePlayer = function(socket) {
	console.log('removing player', socket.id);
	var playerMatch;
	for(var i = this.players.length - 1; i >= 0; i --) {
		if(this.players[i].socketId === socket.id) {
			playerMatch = this.players.splice(i, 1);
		}
	}
	if(playerMatch !== undefined) {
		this.playerCount = this.players.length;
		return playerMatch;
	} else {
		return undefined;
	}
};

var Player = function(playerData, socketId) {
	this.socketId = socketId;
	this.name = playerData.name;
};

exports.init = ScrumPoker.init;
exports.startTable = ScrumPoker.startTable;
exports.joinTable = ScrumPoker.joinTable;
exports.leaveTable = ScrumPoker.leaveTable;
exports.updatePlayerData = ScrumPoker.updatePlayerData;
exports.startHand = ScrumPoker.startHand;
exports.showHand = ScrumPoker.showHand;
exports.endHand = ScrumPoker.endHand;
