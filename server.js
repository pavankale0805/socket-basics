var PORT = process.env.PORT || 3000;
var express = require('express');
var app = express();	//Create new express app
//Start a new http server and to use expres app as boilerplate.
//Anything that express app listen to, this server also listen to.
var http = require('http').Server(app);
//Use express static to expose a folder
app.use(express.static(__dirname + '/public'));

http.listen(PORT, function () {
	console.log('Server started!');
});