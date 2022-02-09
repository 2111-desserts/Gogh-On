import React, { Component } from 'react';
import DrawingCanvas from '../DrawingLobby/DrawingCanvas';
import Chat from '../Chat/Chat';

class FreeDraw extends Component {
  constructor() {
    super();
    this.canvas = React.createRef();
  }
  render() {
    return (
      <div>
        <div>
          <DrawingCanvas canvas={this.canvas} />
        </div>
        <div>
          <Chat />
        </div>
      </div>
    );
  }
}

export default FreeDraw;
