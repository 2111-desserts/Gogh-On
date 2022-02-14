import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas';
import Chat from '../Chat/Chat';
import { Row, Col, Container } from 'react-bootstrap';
import socket from '../../socket';

class HotPotato extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
    }
  }

  componentDidMount(){
    this.loadUsers();
    socket.on('render-users', (playerInfo)=>{
      this.setState({
        players:playerInfo
      })
    })
  }

  loadUsers(){
    const roomId = window.localStorage.getItem('roomId')
    socket.emit('load-users',roomId);
  }


  render() {
    const { players } = this.state
    console.log('PLAYERS in room: ', players.map(player => player.nickname))

    return (
      <Container>
        <Row>
          <Col sm={8}>
            {' '}
            <DrawingCanvas />{' '}
          </Col>
          <Col sm={4}>
            {' '}
            <Chat />
          </Col>
        </Row>
      </Container>
    );
  }
}
export default HotPotato;
