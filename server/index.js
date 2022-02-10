const PORT = process.env.PORT || 8080;
const app = require('./app');

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});


const serverSocket = require('socket.io')(server);
serverSocket.on('connection', (socket) => {
  console.log(`Connection from client ${socket.id}`);

  socket.on('join-room', (userObject) => {
   const { roomId } = userObject;
   const users = socket.adapter.rooms.get(roomId)
    const numUsers = users ? users.size : 0;
    if(numUsers < 4){
      socket.join(userObject.roomId);
      console.log(`successfully joined room `, roomId);
      socket.broadcast.emit('new-user', userObject)
    }
    else{
      socket.emit('room-full')
    }
  });

  socket.on('is-drawing', (data) => {
    socket.broadcast.emit('is-drawing', data);
  });

  socket.on('send-message', (message, sendingUser, room) => {
    socket.broadcast.to(room).emit('receive-message', message, sendingUser);
  });

  socket.on('start-session', (roomId) => {
    console.log('starting session');
    console.log(roomId);
    socket.to(roomId).emit('begin-session');
  });
  socket.on('end-session', (roomId) => {
    socket.to(roomId).emit('ending-session');

    //make users 'leave' room
    //clear any info from that session, inlcuding players, content, room, etc.
  });
});
