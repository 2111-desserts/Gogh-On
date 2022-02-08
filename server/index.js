const PORT = process.env.PORT || 8080;
const app = require('./app');

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

let users = [];
// let onlineCount = 0;

const serverSocket = require('socket.io')(server);

serverSocket.on('connection', (socket) => {
  console.log(`Connection from client ${socket.id}`);

  let addedToList = false;
  let room;
  let currentUsersInRoom;

  socket.on('join-room', (roomId) => {
    if (addedToList) return;
    // onlineCount++;
    // roomId.id = onlineCount;
    addedToList = true;
    room = roomId.room;
    users.push(roomId);
    socket.join(roomId.room);
    socket.userId = roomId.id;
    socket.emit('join-room', roomId);
    currentUsersInRoom = users.filter((user) => {
      if (user.room === room) {
        return user;
      }
    });
    serverSocket.in(room).emit('users', currentUsersInRoom);
    console.log(`sucessfully joined room `, roomId);
  });

  socket.on('backend-test', (message) => {
    console.log(message);
  });

  socket.on('is-drawing', (data) => {
    socket.broadcast.emit('is-drawing', data);
    // console.log(lines);
  });

  socket.on('send-message', (message, sendingUser) => {
    socket.in(message.roomId).emit('receive-message', message, sendingUser);
    console.log(message, sendingUser);
  });
});

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
//
// init();
