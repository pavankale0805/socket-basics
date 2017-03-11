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
io.on('connection', function () {
	console.log('User connected via socket.io!');
});

http.listen(PORT, function () {
	console.log('Server started!');
});