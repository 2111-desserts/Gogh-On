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
      host: '',
      selectedMode: 'freeDraw',
      gameMode: [
        {
          name: 'Free Draw',
          image: '/mode1.png',
          identity: 'freeDraw',
          description: 'Draw freely with friends on one canvas!',
        },
        // {
        //   name: 'Hot Potato',
        //   image: '/mode2.png',
        //   identity: 'hotPotato',
        //   description: 'Each player gets 15 seconds to draw on the canvas!',
        // },
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
    this.loadUsers = this.loadUsers.bind(this);
  }

  componentDidMount() {
    const room = window.localStorage.getItem('roomId');
    socket.emit('get-host', room);

    this.loadUsers();
    socket.on('render-users', (playerInfo) => {
      this.setState({
        players: playerInfo,
      });
    });

    socket.on('set-host', (host) => {
      this.setState({
        host: host,
      });
    });

    socket.on('update-users', () => {
      this.loadUsers();
    });

    socket.on('begin-session', (mode) => {
      this.props.history.push(`/${mode}/${room}`);
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

  startSession(mode) {
    const roomId = window.localStorage.getItem('roomId');
    this.selectMode(mode);
    socket.emit('start-session', roomId, mode);
    this.props.history.push(`/${this.state.selectedMode}/${roomId}`);
  }

  render() {
    const { players, gameMode, selectedMode, host } = this.state;
    const isUserHost = window.localStorage.getItem('host');
    const room = window.localStorage.getItem('roomId');

    return (
      <Container>
        <h2
          style={{
            textAlign: 'center',
            fontFamily: 'Fuzzy Bubbles, cursive',
            color: '#4c6394',
            marginTop: '9px',
          }}
        >{`${host}'s lobby`}</h2>
        <Row
          style={{
            flexWrap: 'nowrap',
            width: '430px',
            justifyContent: 'space-between',
            alignItems: 'center',
            alignContent: 'center',
            textAlign: 'center',
            height: '260px',
          }}
        >
          {players.map((player, ind) => {
            return (
              <Col md={4} style={{ height: '280px' }} key={ind}>
                <img
                  src={`https://avatars.dicebear.com/api/adventurer/${player.avatar}.svg`}
                  width='150px'
                />
                <h4
                  style={{
                    fontFamily: 'Fuzzy Bubbles, cursive',
                    color: '#4c6394',
                  }}
                >
                  {player.nickname}
                </h4>
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
                  height: '350px',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '5px',
                }}
              >
                <Card.Img
                  variant='top'
                  src={mode.image}
                  style={{ width: '190px' }}
                />
                <Card.Title style={{ fontFamily: 'Fuzzy Bubbles, cursive' }}>
                  {mode.name}
                </Card.Title>
                <Card.Text style={{ textAlign: 'center' }}>
                  {mode.description}
                </Card.Text>
                {isUserHost === 'true' ? (
                  <Link to={`/${mode.identity}/${room}`}>
                    <Button
                      type='submit'
                      value={mode.identity}
                      onClick={() => {
                        this.startSession(mode.identity);
                      }}
                    >
                      Start Mode
                    </Button>
                  </Link>
                ) : (
                  <br />
                )}
              </Card>
            );
          })}
          <Col
            md={{ span: 4, offset: 4 }}
            style={{ marginLeft: '10%', marginTop: '-269px' }}
          >
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
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Lobby;
