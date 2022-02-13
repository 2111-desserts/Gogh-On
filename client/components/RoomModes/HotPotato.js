import React, { Component } from 'react';
import DrawingCanvas from '../DrawingCanvas';
import Chat from '../Chat/Chat';
import Timer from '../Timer';
import { Row, Col, Container } from 'react-bootstrap';

class HotPotato extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <Container>
        <Row>
          <Col sm={8}>
            <Timer />
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
