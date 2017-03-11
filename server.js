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
//Allow to listen for event 'connection' and then call function
io.on('connection', function (socket) {
	console.log('User connected via socket.io!');
	
	//Individual message that user sends
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		message.timestamp = moment().valueOf();
		//Send to everybody excluding person who sent it use socket.broadcast.emit
		//For sending to everybody including sendor use io.emit
		//socket.broadcast.emit('message', message);
		io.emit('message', message);
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