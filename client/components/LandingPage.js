import React, { Component } from 'react';
import { uid } from 'uid';
import socket from '../socket';
import { Form, Button } from 'react-bootstrap';
import Footer from './Footer';


class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      avatarSeed: 'seed',
      nickname: 'Cooldude42',
      host: false,
      roomId: '',
      socket: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.setState({
      socket: socket,
    });

    const room = this.props.location.search.substring(1);
    if (!room) {
      const newRoomId = uid();
      this.setState({
        roomId: newRoomId,
        host: true,
      });
    } else {
      this.setState({
        roomId: room,
      });
    }
    socket.on('room-full', () => {
      this.props.history.push('/error');
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    socket.emit('set-info', {
      roomId: this.state.roomId,
      nickname: this.state.nickname,
      avatar: this.state.avatarSeed,
      host: this.state.host,
    });
    socket.emit('join-room', this.state.roomId);
    window.localStorage.setItem('roomId', this.state.roomId);
    window.localStorage.setItem('avatar', this.state.avatarSeed);
    window.localStorage.setItem('nickname', this.state.nickname);
    window.localStorage.setItem('host', this.state.host);
    this.props.history.push(`/lobby/${this.state.roomId}`);
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.currentTarget.value,
    });
  }

  render() {
    const { avatarSeed } = this.state;
    const { handleSubmit, handleChange } = this;
    return (
      <div className='homepage'>
        <Form onSubmit={handleSubmit}>
          <h3>Welcome to Gogh On! 🎨🖌️</h3>
          <p>
            <b>Create a piece of art with up to 4 friends on one canvas!</b>
          </p>
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            type='text'
            name='nickname'
            defaultValue='Cooldude42'
            onChange={handleChange}
          />
          <Form.Label>Avatar</Form.Label>
          <img
            src={`https://avatars.dicebear.com/api/adventurer/${avatarSeed}.svg`}
            width={128}
          />
          <Form.Control
            name='avatarSeed'
            onChange={handleChange}
            placeholder='Start writing your custom avatar seed'
          />

          {this.props.location.search.substring(1) ? (
            <Button type='submit'>Join Room</Button>
          ) : (
            <Button type='submit'>Create Room</Button>
          )}
        </Form>
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
