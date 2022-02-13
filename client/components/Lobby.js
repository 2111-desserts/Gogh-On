import React, { Component } from 'react';
import Chat from './Chat/Chat';
import { Link } from 'react-router-dom';
import socket from '../socket';
import { Container, Col, Row, Card, Button } from 'react-bootstrap';

class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      players: [],
      selectedMode: 'freeDraw',
      gameMode: [
        {
          name: 'Free Draw',
          image: '/mode1.png',
          identity: 'freeDraw',
          description: 'Draw freely with friends on one canvas!',
        },
        {
          name: 'Hot Potato',
          image: '/mode2.png',
          identity: 'hotPotato',
          description: 'Each player gets 15 seconds to draw on the canvas!',
        },
      ],
    };
    this.handleClick = this.handleClick.bind(this);
    this.startSession = this.startSession.bind(this);
    this.selectMode = this.selectMode.bind(this);
  }

  componentDidMount() {
    this.loadUsers();
    socket.on('get-info', () => {
      console.log('getting the info');
      let userInfo = {
        nickname: window.localStorage.getItem('nickname'),
        avatar: window.localStorage.getItem('avatar'),
        host: window.localStorage.getItem('host'),
      };
      socket.emit('return-info', userInfo);
    });
    socket.on('render-user', (playerInfo) => {
      this.setState({
        players: [...this.state.players, playerInfo],
      });
    });
    socket.on('new-user', (player) => {
      console.log(`New user has joined room ${player.roomId}`);
      this.setState({
        players: [...this.state.players, player],
      });
    });
    socket.on('begin-session', () => {
      this.props.history.push(`/freeDraw/${this.state.roomId}`);
      console.log('working');
    });
  }

  loadUsers() {
    const roomId = window.localStorage.getItem('roomId');
    socket.emit('load-users', roomId);
  }

  handleClick() {
    const roomId = window.localStorage.getItem('roomId');
    navigator.clipboard.writeText(`${window.location.host}/?` + roomId);
  }

  selectMode(mode) {
    this.setState({
      selectedMode: mode,
    });
  }

  startSession() {
    const roomId = window.localStorage.getItem('roomId');
    socket.emit('start-session', roomId);
    this.props.history.push(`/freeDraw/${roomId}`);
  }

  render() {
    const { players, gameMode, selectedMode } = this.state;
    const host = window.localStorage.getItem('host');
    return (
      <Container>
        <Row
          style={{
            flexWrap: 'nowrap',
            width: '430px',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
          }}
        >
          {players.map((player, ind) => {
            return (
              <Col md={4} style={{ height: '280px' }} key={ind}>
                <img
                  src={`https://avatars.dicebear.com/api/adventurer/${player.avatar}.svg`}
                  width='150px'
                />
                <p>{player.nickname}</p>
              </Col>
            );
          })}
        </Row>
        <Row
          style={{
            height: '230px',
            flexWrap: 'nowrap',
          }}
        >
          {gameMode.map((mode, ind) => {
            return (
              <Card
                key={ind}
                style={{
                  width: '18rem',
                  height: '333px',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onClick={() => this.selectMode(mode.identity)}
              >
                <Card.Img
                  variant='top'
                  src={mode.image}
                  style={{ width: '180px' }}
                />
                <Card.Title>{mode.name}</Card.Title>
                <Card.Text style={{ textAlign: 'center' }}>
                  {mode.description}
                </Card.Text>
                <Button variant='primary'>Start</Button>
              </Card>
            );
          })}
          <Col md={{ span: 4, offset: 4 }} style={{ marginLeft: '10%' }}>
            <Chat />
          </Col>
        </Row>
        <Row style={{ marginTop: '130px' }}>
          <Col>
            <Button
              className='session-link'
              type='button'
              onClick={() => this.handleClick()}
            >
              Copy Invite Link
            </Button>
            {host === 'true' ? (
              <Link to={`/${selectedMode}`}>
                <button type='button' onClick={() => this.startSession()}>
                  Start Session
                </button>
              </Link>
            ) : (
              <br />
            )}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lobby;
