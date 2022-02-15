import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import PostDraw from './components/PostDraw';
import Lobby from './components/Lobby';
import LandingPage from './components/LandingPage';
import DrawingCanvas from './components/DrawingCanvas';
import Chat from './components/Chat/Chat';
import About from './components/About';
import FreeDraw from './components/RoomModes/FreeDraw';
import Error from './components/Error';

import HotPotato from './components/RoomModes/HotPotato';
import HotPotato2 from './components/RoomModes/HotPotato2';
import socket, { initSocket } from './socket';

class Routes extends Component {
  componentDidMount() {
    initSocket(socket);
  }

  render() {
    return (
      <div>
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route path='/?:roomId' component={LandingPage} />
          <Route path='/canvas' component={DrawingCanvas} />
          <Route path='/chat' component={Chat} />
          <Route path='/lobby' component={Lobby} />
          <Route path='/postDraw' component={PostDraw} />
          {/* <Route path='/about' component={About} /> */}
          <Route path='/freeDraw' component={FreeDraw} />
          <Route path='/hotPotato' component={HotPotato} />
          <Route path='/hotPotato2' component={HotPotato2} />
          <Route path='/error' component={Error} />
        </Switch>
      </div>
    );
  }
}

export default Routes;
