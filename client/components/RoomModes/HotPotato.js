import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas';
import Chat from '../Chat/Chat';
import Timer from '../Timer';
import { Row, Col, Container } from 'react-bootstrap';
import socket from '../../socket';

class HotPotato extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      seconds: 15,
      rounds: 1,
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
    // const roomId = window.localStorage.getItem('roomId')
    // console.log("this is the room we are in", roomId)
    // console.log("this is our current state", this.state)
    // // const allUsers = socket.emit('')

    // }

  render() {
    const { players } = this.state
    console.log('PLAYERS in room: ', players.map(player => player.nickname))

    return (
      <Container>
        <Row>
          <Col sm={8}>
            <Timer seconds={this.state.seconds}/>
            <DrawingCanvas />
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
