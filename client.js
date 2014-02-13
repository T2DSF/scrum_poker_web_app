(function() {

	var socket;

	var server = {
		connect: function() {
			var self = this;

			socket = io.connect('http://localhost:8020');

			socket.on('connect', function() {
				if(PokerServer.clientType === "dealer") {
					socket.emit('startPokerTable');
				} else if(PokerServer.clientType === "player") {
					socket.emit('joinPokerTable', { table: PokerServer.tableId });
				}
			});
			socket.on('tableConnect', function(tableId) {
				if(PokerServer.clientType === "dealer") {
					PokerServer.tableId = tableId;
				}
				PokerServer.completeCallback();
			});
			socket.on('voteProgress', function(progress) {
				if(PokerServer.voteProgressCallback !== undefined) {
					PokerServer.voteProgressCallback();
				}
			});
			socket.on('voteComplete', function(average) {
				if(PokerServer.voteCompleteCallback !== undefined) {
					PokerServer.voteCompleteCallback();
				}
			});
			socket.on('voteBegin', function(currentIssue) {
				if(PokerServer.voteBeginCallback !== undefined) {
					PokerServer.voteBeginCallback();
				}
			});
		},
		startHand: function() {
			socket.emit('startHand', { table: PokerServer.tableId });
		},
		endHand: function() {
			socket.emit('endHand', { table: PokerServer.tableId });
		},
		showHand: function(value) {
			socket.emit('showHand', { table: PokerServer.tableId, vote: value });
		},

	};

	var PokerServer = {
		clientType: undefined,
		tableId: undefined,
		connectCallback: undefined,
		voteProgressCallback: undefined,
		voteCompleteCallback: undefined,
		voteBeginCallback: undefined,

		startPokerTable: function(completeCallback) {
			this.connectCallback = completeCallback;
			this.clientType = "dealer";
			server.connect();
		},
		joinPokerTable: function(tableId, completeCallback) {
			this.connectCallback = completeCallback;
			this.clientType = "player";
			this.tableId = tableId;
			server.connect();
		},
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
			handleVoteProgress: function(callback) {
				this.voteProgressCallback = callback;
			},
			handleVoteComplete: function(callback) {
				this.voteCompleteCallback = callback;
			},
			handleVoteBegin: function(callback) {
				this.voteBeginCallback = callback;
			}
		}
	};

	return PokerServer;
	
})();