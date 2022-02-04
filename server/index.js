const PORT = process.env.PORT || 8080;
const app = require('./app');

// //From og fullstack boilerplate (NOT working):
// const socket = require('socket.io');

// const init = async () => {
//   try {
//     // start listening (and create a 'server' object representing our server)
//     app.listen(PORT, () => console.log(`Mixing it up on port ${PORT}`));
//   } catch (ex) {
//     console.log(ex);
//   }
// };

const server = app.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});


const serverSocket = require('socket.io')(server)
serverSocket.on('connection', (socket) => {
	console.log(`Connection from client ${socket.id}`);
	socket.on('join-room',(roomId) =>{
		socket.join(roomId)
		console.log(`sucessfully joined room `, roomId)
	})
	socket.on('backend-test', (message) =>{
		console.log(message)
	})
	// socket.on('send-message', (message, room) => {
	// 	if (room === '') {
	// 		socket.broadcast.emit('receive-message', message);
	// 	} else {
	// 		socket.to(room).emit('receive-message', message);
	// 	}
	// });
	// socket.on('join-room', (room, cb) => {
	// 	socket.join(room);
	// 	// socket.broadcast.emit('joined-room', user);
	// 	cb(`joined ${room}`);
	// });
});

//from OG fullstack boilerplate
// init();
