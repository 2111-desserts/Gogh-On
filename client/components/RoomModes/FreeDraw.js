import React, { Component } from 'react';
import DrawingCanvas from '../DrawingLobby/DrawingCanvas';
import Chat from '../Chat/Chat';
import { Row, Col, Container } from 'react-bootstrap';

class FreeDraw extends Component {
  constructor() {
    super();
    // this.canvas = React.createRef();
  }
  render() {
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

export default FreeDraw;
