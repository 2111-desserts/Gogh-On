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

  socket.on('is-drawing', (data, room) => {
    socket.broadcast.to(room).emit('is-drawing', data);
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
});
