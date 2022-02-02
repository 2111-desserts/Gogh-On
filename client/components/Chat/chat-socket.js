import socket from 'socket.io-client';

const joinRoomButton = document.getElementById('room-button');
const messageInput = document.getElementById('message-input');
const roomInput = document.getElementById('room-input');
const form = document.getElementById('form');

const clientSocket = socket(window.location.origin);

clientSocket.on('receive-message', (message) => {
	displayMessage(message);
});

form.addEventListener('submit', (e) => {
	e.preventDefault();
	const message = messageInput.value;
	const room = roomInput.value;

	if (message === '') return;
	clientSocket.emit('send-message', message, room);
	displayMessage(message);

	messageInput.value = '';
});

joinRoomButton.addEventListener('click', () => {
	const room = roomInput.value;
	clientSocket.emit('join-room', room, (message) => {
		displayMessage(message);
	});
});

function displayMessage(message) {
	const div = document.createElement('div');
	div.textContent = message;
	document.getElementById('message-container').append(div);
}

clientSocket.on('connect', () => {
	displayMessage(`You're connected with id: ${clientSocket.id}`);
	console.log('Connected to server');
});