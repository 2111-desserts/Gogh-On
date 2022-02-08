// const PORT = process.env.PORT || 8080;
const app = require('./app');
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io")
app.use(cors());

const server = http.createServer(app);

// const serverSocket = require('socket.io')(server);
const serverSocket = new http.ServerResponse(server, {
  cors: {
    origin:"*",
    methods: ["GET", "POST"],
  }
})

serverSocket.on('connection', (socket) => {
  console.log(`Connection from client ${socket.id}`);
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
    console.log(`sucessfully joined room `, roomId);
  });
  socket.on('backend-test', (message) => {
    console.log(message);
  });
  socket.on('is-drawing', (data) => {
    socket.broadcast.emit('is-drawing', data);
  });

  socket.on('send-message', (message, sendingUser, room) => {
    socket.broadcast.to(room).emit('receive-message', message, sendingUser);
  });
});

server.listen(8080, ()=>{
  console.log('server is serving!!')
})
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
