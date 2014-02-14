var ScrumPoker = {
	pokerTables: {},
	socket: undefined,
	init: function(socket) {
		console.log("init ScrumPoker");
		ScrumPoker.socket = socket;
	},
	startTable: function(socket, playerData) {
		console.log("startTable", socket, playerData);
		var tableId = ScrumPoker.buildTable();
		ScrumPoker.joinTable(socket, tableId, playerData);
	},
	joinTable: function(socket, tableId, playerData) {
		console.log(ScrumPoker.pokerTables, ScrumPoker.pokerTables[tableId], tableId);
		socket.join(tableId);
		ScrumPoker.pokerTables[tableId].players.push(playerData);
		socket.emit('tableConnect', tableId, ScrumPoker.pokerTables[tableId].players);

		ScrumPoker.pokerTables[tableId].playerCount ++;
		ScrumPoker.socket.in(tableId).emit('playerConnect', ScrumPoker.pokerTables[tableId].players);
	},
	leaveTable: function(socket, tableId, playerData) {
		socket.leave(tableId);

		ScrumPoker.pokerTables[tableId].playerCount --;
		ScrumPoker.socket.in(tableId).emit('playerDisconnect', ScrumPoker.pokerTables[tableId].players[playerData.name]);
	},
	updatePlayerData: function(socket, tableId, oldPlayerData, newPlayerData) {
		// TODO
	},
	startHand: function(socket, tableId) {
		ScrumPoker.pokerTables[tableId].handData = [];
		ScrumPoker.pokerTables[tableId].currentIssue ++;
		ScrumPoker.pokerTables[tableId].issueProgress = 0;
		ScrumPoker.socket.in(tableId).emit('handBegin', {
			currentIssue: ScrumPoker.pokerTables[tableId].currentIssue
		});
	},
	showHand: function(socket, tableId, name, handValue) {
		ScrumPoker.pokerTables[tableId].issueProgress ++;
		ScrumPoker.pokerTables[tableId].handData.push({ name: name, handValue: handValue });
		ScrumPoker.socket.in(tableId).emit('handProgress', {
			issueProgress: ScrumPoker.pokerTables[tableId].issueProgress / ScrumPoker.pokerTables[tableId].playerCount
		});
	},
	endHand: function(socket, tableId) {
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
	},


	buildTable: function() {
		var id = "";

	    var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	    for( var i=0; i < 4; i++ ) {
	        id += charset.charAt(Math.floor(Math.random() * charset.length));
	    }

		ScrumPoker.pokerTables[id] = new Table(id);
		return id;
	}
};

var Table = function(tableId) {
	return {
		players: [],
		playerCount: 0,
		tableId: tableId,
		handData: [],
		currentIssue: 0,
		issueProgress: 0
	};
};

var Player = function(name) {
	return {
		name: name
	};
};

exports.init = ScrumPoker.init;
exports.startTable = ScrumPoker.startTable;
exports.joinTable = ScrumPoker.joinTable;
exports.leaveTable = ScrumPoker.leaveTable;
exports.updatePlayerData = ScrumPoker.updatePlayerData;
exports.startHand = ScrumPoker.startHand;
exports.showHand = ScrumPoker.showHand;
exports.endHand = ScrumPoker.endHand;
