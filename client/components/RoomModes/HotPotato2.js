import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas';
import Chat from '../Chat/Chat';
import Timer from '../Timer';
import { Row, Col, Container } from 'react-bootstrap';
import socket from '../../socket';
import MessageList from '../Chat/MessageList';

//FAKE version

class HotPotato2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      players: [],
      avatars: [],
      seconds: 15,
      index: 0
    //   rounds: 0,
    //   drawer: ' '
    }
    this.countingDown = false;
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
  }

  componentDidMount(){
    this.loadUsers();
    socket.on('render-users', (playerInfo)=>{
      this.setState({
        players: playerInfo.map(player => player.nickname),
        avatars: playerInfo.map(player => player.avatar)
      })
    })
    this.startTimer()
    this.rotateUser = setInterval(() => {
        this.setState(({players, index}) => {
          index = (index + 1) % players.length;
          return {
            index
          };
        });
      }, 15000); // 15000ms = 15 seconds
  }


  loadUsers(){
    const roomId = window.localStorage.getItem('roomId')
    socket.emit('load-users',roomId);
  }

  startTimer() {
    this.countingDown = true;
    if (this.countingDown) {
      this.timer = setInterval(this.countDown, 1000);
    }
  }

  countDown() {
    // Remove one second, set state so a re-render happens.
    console.log(this.state.seconds, "seconds")
    let seconds = this.state.seconds - 1;
    this.setState({
      seconds: seconds,
    });

    if (seconds === 0) {
      // clearInterval(this.timer);
      this.timer = 0;
      this.countingDown = false;
      this.setState({seconds: 15});
    }
  }

  render() {
    const { index, players, avatars } = this.state;
    // console.log('PLAYERS in room: ', players.map(player => player.nickname))
    console.log('PLAYERS in room: ', players)

    return (
      <Container>
        <Row>
          <Col sm={8}>
          {/* <Timer seconds={this.state.seconds}/> */}
            {/* <Timer seconds={this.state.seconds, this.state.drawer}/> */}
            <div><h3><b>TIME LEFT: </b><i>{this.state.seconds}</i></h3></div>
            <div><h3><b>{players[index]}</b><i>, DRAW!</i></h3></div>
            {/* `https://avatars.dicebear.com/api/adventurer/${player.avatar}.svg` */}
            <div>
                <center>
            <img
                  src={`https://avatars.dicebear.com/api/adventurer/${avatars[index]}.svg`}
                  width='150px'
                />
                </center>
            </div>
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
