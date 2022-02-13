const PORT = process.env.PORT || 8080;
const app = require('./app');

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});

const serverSocket = require('socket.io')(server);

serverSocket.on('connection', (socket) => {
  console.log(`Connection from client ${socket.id}`);

  socket.on('disconnecting',()=>{
    const room = Array.from(socket.rooms)
    socket.to(room[1]).emit('update-users');
  })

  socket.on('join-room', (roomId) => {
    const users = socket.adapter.rooms.get(roomId)
    const numUsers = users ? users.size : 0;
    if(numUsers < 4){
      socket.join(roomId);
      console.log(`successfully joined room `, roomId);
      socket.to(roomId).emit('update-users')
    }
    else{
      socket.broadcast.emit('room-full')
    }
  });

  socket.on('set-info',(userObj)=>{
    socket.nickname = userObj.nickname;
    socket.avatar = userObj.avatar;
    socket.host = userObj.host;
  })

  socket.on('load-users',async (roomId)=>{
    const users = await serverSocket.in(roomId).fetchSockets();
    let roomInfo = []
    for(const socket of users){
      const nickname = socket.nickname;
      const avatar = socket.avatar;
      const host = socket.host;
      roomInfo.push({
        nickname,
        avatar,
        host
      })
    }
    socket.emit('render-users', roomInfo);
  })

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
  socket.on('load-users',(roomId)=>{
    const rooms = Array.from(socket.adapter.rooms.get(roomId))
    console.log(rooms);
    let roomInfo = []
    socket.emit('get-info');
    socket.on('return-info',(userInfo)=>{
      console.log(userInfo);
      socket.emit('render-user', userInfo)
    })
    // for(let i = 0; i < rooms.length; i++){
    //   let room = rooms[1]
    //   console.log('attempting to get info from,',rooms[i])
    //   socket.emit('get-info')
    //   // socket.on('return-info',(userInfo)=>{
    //   //   roomInfo.push(userInfo)
    //   // })
    // }
    // //socket.to(roomId).emit('render-users',roomInfo);
  })

  socket.on('starting-game', (time, roomId) =>{
    console.log("i've received the start game input from the back end! this is my roomId", roomId)
    socket.broadcast.to(roomId).emit('starting-timer', time)
  })

  socket.on('is-drawing', (data, room) => {
    socket.broadcast.to(room).emit('is-drawing', data);
  });
});
