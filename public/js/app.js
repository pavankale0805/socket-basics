var socket = io();

socket.on('connect', function () {
	console.log('Connected to socket.io server');
});

socket.on('message', function (message) {
	console.log('New message:');
	console.log(message.text);

	jQuery('.messages').append('<p>' + message.text + '</p>');
});

// Handles submitting of new message

//$form stores jquery instance of an element with id=message-form
//That means this variable has access to all the methods that you could access on any jquery element
var $form = jQuery('#message-form'); 

$form.on('submit', function (event) {
	event.preventDefault();
	var $message = $form.find('input[name=message]');

	socket.emit('message', {
		text: $message.val()
	});
	$message.val('');
});