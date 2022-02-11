import React, { Component } from 'react';
import { Howl } from 'howler';
import Chat from './Chat/Chat';
import { Link } from 'react-router-dom';
import socket from '../socket';

const audioClip = {
  sound:
    'https://algorithmic-8ball.neocities.org/team_dessert/button_START.mp3',
};

// const dummyUsers = [
//   {nickname: "ataa", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
//   {nickname: "ellie", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
//   {nickname: "amanda", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
//   {nickname: "quynh", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
// ]

class Lobby extends Component {
  constructor() {
    super();
    this.state = {
      sound: false,
      players: [],
    };
    this.handleClick = this.handleClick.bind(this);
    this.startSession = this.startSession.bind(this);
  }

  componentDidMount() {
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

  soundPlay(src) {
    const sound = new Howl({
      src,
      html5: true,
    });
    sound.play();
  }

  handleClick() {
    const roomId = window.localStorage.getItem('roomId');
    //ATM it's written to adjust to localhost site hosting rather than heroku
    // navigator.clipboard.writeText("localhost:8080/?"+roomId)
    navigator.clipboard.writeText(`${window.location.host}/?` + roomId);
    //for heroku:
    // navigator.clipboard.writeText("artusts.herokuapp.com/?"+roomId)

    this.setState.sound = true;
    this.soundPlay(audioClip.sound);
  }

  startSession() {
    this.setState.sound = true;
    this.soundPlay(audioClip.sound);
    const roomId = window.localStorage.getItem('roomId');
    socket.emit('start-session', roomId);
    this.props.history.push(`/freeDraw/${roomId}`);
  }

  render() {
    const { players } = this.state;
    // let settings = dummySettings
    const host = window.localStorage.getItem('host');
    return (
      <div id='lobby-room'>
        <div className='logo'>logo</div>
        <div className='users'>
          {players.map((player) => {
            return (
              <div>
                <img
                  src={`https://avatars.dicebear.com/api/adventurer/${player.avatar}.svg`}
                  width='200px'
                />
                <p>{player.nickname}</p>
              </div>
            );
          })}
        </div>

        {/* <div className="draw-session-settings">{settings.map((setting) => {
          return(<div>
            <img src={setting.image} width="200px" />
            <p>{setting.name}</p>
          </div>)
        })}</div> */}
        <Chat />
        <button
          className='session-link'
          type='button'
          onClick={() => this.handleClick()}
        >
          Copy Invite Link
        </button>
        {host === 'true' ? (
          <div>
            {' '}
            <Link to='/freeDraw'>
              <button type='button' onClick={() => this.startSession()}>
                Free Draw
              </button>
            </Link>
            <Link to='/hotpotato'>
              <button type='button'>Hot Potato</button>
            </Link>
          </div>
        ) : (
          <button type='button'>Leave Session</button>
        )}
      </div>
    );
  }
}

export default Lobby;
