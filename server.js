var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();	//Create new express app
//Start a new http server and to use expres app as boilerplate.
//Anything that express app listen to, this server also listen to.
var http = require('http').Server(app);
var io = require('socket.io')(http);

//Use express static to expose a folder
app.use(express.static(__dirname + '/public'));
//Allow to listen for event 'connection' and then call function
io.on('connection', function (socket) {
	console.log('User connected via socket.io!');
	
	socket.on('message', function (message) {
		console.log('Message received: ' + message.text);

		//Send to everybody excluding person who sent it use socket.broadcast.emit
		//For sending to everybody including sendor use io.emit
		//socket.broadcast.emit('message', message);
		io.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the chat application'
	});
});

http.listen(PORT, function () {
	console.log('Server started!');
});