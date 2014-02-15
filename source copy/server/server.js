var app = require('http').createServer(handler),
  io = require('socket.io').listen(app),
  fs = require('fs'),
  ScrumPoker = require('./ScrumPoker');

app.listen(8020);

function handler (req, res) {
  fs.readFile(__dirname + '/index.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200);
    res.end(data);
  });
}

io.sockets.on('connection', function (socket) {
	socket.on('startTable', function(data) {
		ScrumPoker.startTable(socket, data.playerData);
	});
	socket.on('joinTable', function(data) {
		ScrumPoker.joinTable(socket, data.tableId, data.playerData);
	});
	socket.on('startHand', function(data) {
		ScrumPoker.startHand(socket, data.tableId);
	});
	socket.on('endHand', function(data) {
		ScrumPoker.endHand(socket, data.tableId);
	});
	socket.on('showHand', function(data) {
		ScrumPoker.showHand(socket, data.tableId, data.name, data.handValue);
	});
	socket.on('updatePlayerInfo', function(data) {
		ScrumPoker.updatePlayerData(socket, data.tableId, data.playerData);
	});
	socket.on('playerLeaving', function(data) {
		ScrumPoker.removePlayer(socket, data.tableId, data.playerData);
	});
});

ScrumPoker.init(io.sockets);