import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas';
import Chat from '../Chat/Chat';
import { Row, Col, Container } from 'react-bootstrap';

class HotPotato extends Component {
  constructor() {
    super();
    this.state = {
      
    }
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={8}>
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
