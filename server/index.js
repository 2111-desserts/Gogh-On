const PORT = process.env.PORT || 8080;
const app = require('./app');

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const serverSocket = require('socket.io')(server);

serverSocket.on('connection', (socket) => {
  console.log(`Connection from client ${socket.id}`);

  socket.on('disconnecting', () => {
    const room = Array.from(socket.rooms);
    socket.to(room[1]).emit('update-users');
  });

  socket.on('join-room', (roomId) => {
    const users = socket.adapter.rooms.get(roomId);
    const numUsers = users ? users.size : 0;
    if (numUsers < 4) {
      socket.join(roomId);
      console.log(`successfully joined room `, roomId);
      socket.to(roomId).emit('update-users');
    } else {
      socket.broadcast.emit('room-full');
    }
  });

  socket.on('set-info', (userObj) => {
    socket.nickname = userObj.nickname;
    socket.avatar = userObj.avatar;
    socket.host = userObj.host;
  });

  socket.on('get-host', async (room) => {
    const users = Array.from(socket.adapter.rooms.get(room));
    const userHost = await serverSocket.fetchSockets(users[0]);
    const hostName = userHost[0].nickname;
    socket.emit('set-host', hostName);
  });

  socket.on('load-users', async (roomId) => {
    const users = await serverSocket.in(roomId).fetchSockets();
    let roomInfo = [];
    for (const socket of users) {
      const nickname = socket.nickname;
      const avatar = socket.avatar;
      const host = socket.host;
      roomInfo.push({
        nickname,
        avatar,
        host,
      });
    }
    socket.emit('render-users', roomInfo);
  });

  socket.on('send-message', (message, sendingUser, room) => {
    socket.broadcast.to(room).emit('receive-message', message, sendingUser);
  });

  socket.on('start-session', (roomId, mode) => {
    console.log('starting session:', roomId, mode);
    socket.to(roomId).emit('begin-session', mode);
  });

  socket.on('end-session', (roomId) => {
    socket.to(roomId).emit('ending-session');

    //make users 'leave' room
    //clear any info from that session, including players, content, room, etc.
  });

  socket.on('is-drawing', (data, room) => {
    socket.broadcast.to(room).emit('is-drawing', data);
  });

  socket.on('is-DRAWER', (data, room, drawer) => {
    socket.broadcast.to(room).emit('is-DRAWER', drawer);
  })

});
