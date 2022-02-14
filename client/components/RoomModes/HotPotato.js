import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas';
import Chat from '../Chat/Chat';
import Timer from '../Timer';
import { Row, Col, Container } from 'react-bootstrap';

class HotPotato extends Component {
  constructor() {
    super();
    this.state = {
      seconds: 15,
      rounds: 1,
    }
  }

  componentDidMount(){
    const roomId = window.localStorage.getItem('roomId')
    console.log(roomId)
    // const allUsers = socket.emit('')

    }


  render() {
    return (
      <Container>
        <Row>
          <Col sm={8}>
            <Timer seconds={this.state.seconds}/>
            <DrawingCanvas />
          </Col>
          <Col sm={4}>
            <Chat />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default HotPotato;
