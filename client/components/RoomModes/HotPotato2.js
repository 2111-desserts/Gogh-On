import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas';
import Chat from '../Chat/Chat';
import Timer from '../Timer';
import { Row, Col, Container } from 'react-bootstrap';
import socket from '../../socket';
import MessageList from '../Chat/MessageList';

class HotPotato2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      seconds: 15,
      index: 0
    //   rounds: 0,
    //   drawer: ' '
    }
  }

  componentDidMount(){
    this.loadUsers();
    socket.on('render-users', (playerInfo)=>{
      this.setState({
        players: playerInfo.map(player => player.nickname)
      })
    })
    this.timer = setInterval(() => {
        this.setState(({players, index}) => {
          index = (index + 1) % players.length;
          return {
            index
          };
        });
      }, 5000); // 5000ms = 5 seconds
  }

  loadUsers(){
    const roomId = window.localStorage.getItem('roomId')
    socket.emit('load-users',roomId);
  }
 

  render() {
    const { index, players } = this.state;
    // console.log('PLAYERS in room: ', players.map(player => player.nickname))   
    console.log('PLAYERS in room: ', players)

    return (
      <Container>
        <Row>
          <Col sm={8}>
          <Timer seconds={this.state.seconds}/>
            {/* <Timer seconds={this.state.seconds, this.state.drawer}/> */}
            <div>DRAWER: {players[index]}</div>
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
export default HotPotato2;
