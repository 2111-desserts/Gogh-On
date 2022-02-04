import React from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import Chat from './components/Chat/Chat';
import socket from 'socket.io-client';
import { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';

const clientSocket = socket(window.location.origin);

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
