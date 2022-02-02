import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Chat from './components/Chat/Chat';
import socket from 'socket.io-client';
import { useState } from 'react';

const clientSocket = socket(window.location.origin);

const App = () => {
  // const [username, setUsername] = useState("");
  const [room, setRoom] = useState('');
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    const roomInput = document.getElementById('room-input');
    const room = roomInput.value;
    if (room !== '') {
      clientSocket.emit('join_room', room);
      setShowChat(true);
      console.log('in room', room);
      console.log('clientSocket', clientSocket);
    }
  };

  return (
    <div>
      <Navbar />
      <Routes />
      {!showChat ? (
        <div>
          {/* <form id="form"> */}
          <h3>Join A Room</h3>
          <input
            type='text'
            id='room-input'
            placeholder='Room ID...'
            onChange={(event) => {
              setRoom(event.target.value);
            }}
          />
          <button onClick={joinRoom}>Join A Room</button>
          {/* </form> */}
        </div>
      ) : (
        <Chat socket={clientSocket} room={room} />
      )}
    </div>
  );
};

export default App;
