var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();	//Create new express app
//Start a new http server and to use expres app as boilerplate.
//Anything that express app listen to, this server also listen to.
var http = require('http').Server(app);
var io = require('socket.io')(http);
var moment = require('moment');

//Use express static to expose a folder
app.use(express.static(__dirname + '/public'));

var clientInfo = {};

//Sends current users ro provided socket
function sendCurrentUsers (socket) {
	var info = clientInfo[socket.id];
	var users = [];

	if(typeof info === 'undefined') {
		return;
	}

	Object.keys(clientInfo).forEach(function (socketId) {
		var UserInfo = clientInfo[socketId];
		if(info.room === UserInfo.room) {
			users.push(UserInfo.name);
		}
	});

	socket.emit('message', {
		name: 'System',
		text: 'Current users: ' + users.join(', '),
		timestamp: moment.valueOf()
	});
}

//Allow to listen for event 'connection' and then call function
io.on('connection', function (socket) {
	console.log('User connected via socket.io!');

	socket.on('disconnect', function () {
		var userData = clientInfo[socket.id];
		if (typeof userData !== 'undefined') {
			socket.leave(userData.room);
			io.to(userData.room).emit('message', {
				name: 'System',
				text: userData.name + ' has left!',
				timestamp: moment().valueOf()
			});
			delete clientInfo[socket.id];
		}
	});
	
	socket.on('joinRoom', function (req) {
		clientInfo[socket.id] = req;
		socket.join(req.room);
		socket.broadcast.to(req.room).emit('message', {
			name: 'System',
			text: req.name + ' has joined!',
			timestamp: moment().valueOf()
		});
	});

	//Individual message that user sends
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		if (message.text === '@currentUsers') {
			sendCurrentUsers(socket);
		} else {
			message.timestamp = moment().valueOf();
			io.to(clientInfo[socket.id].room).emit('message', message);
		}

		/*message.timestamp = moment().valueOf();
		//Send to everybody excluding person who sent it use socket.broadcast.emit
		//For sending to everybody including sendor use io.emit
		//socket.broadcast.emit('message', message);
		//io.emit('message', message);
		io.to(clientInfo[socket.id].room).emit('message', message);*/
	});

	//Initial system message to all users
	socket.emit('message', {
		name: 'System',
		text: 'Welcome to the chat application',
		timestamp: moment().valueOf()
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});