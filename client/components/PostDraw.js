import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // delete link;
}

class PostDraw extends Component {
  constructor(props) {
    super(props);
  }

  saveImage() {
    const exportedURI = window.localStorage.dataURI;
    downloadURI(exportedURI, 'image.png');
  }

  render() {
    return (
      <Container className='post-draw'>
        <Row>
          <Col>
            <h2 style={{ textAlign: 'center' }}>Thanks for Drawing!</h2>
            <img src={window.localStorage.dataURI} onContextMenu={(e) => e.preventDefault()}/>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={this.saveImage}>okay i like it, picasso</Button>
            <Link to='/'>
              <Button
                style={{
                  background: '#cdd27e',
                  borderColor: '#cdd27e',
                  color: '#2f3774',
                }}
              >
                Start a New Draw Session
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default PostDraw;
