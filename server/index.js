const PORT = process.env.PORT || 8080;
const app = require('./app');

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

// function joinToRoom(room, user)
// const roomPlayers = []

const serverSocket = require('socket.io')(server);
serverSocket.on('connection', (socket) => {
  console.log(`Connection from client ${socket.id}`);

  socket.on('join-room', (userObject) => {
    const { roomId } = userObject
    socket.join(userObject.roomId);
    console.log('this is the user object', userObject)
    console.log(`successfully joined room `, roomId);
    // roomPlayers.push(userObject)
    socket.broadcast.emit('new-user', userObject)

  });

  socket.on('is-drawing', (data) => {
    socket.broadcast.emit('is-drawing', data);
  });

  socket.on('send-message', (message, sendingUser, room) => {
    socket.broadcast.to(room).emit('receive-message', message, sendingUser);
  });

  socket.on('start-session', (roomId)=>{
    socket.to(roomId).emit('begin-session');
  })
});
