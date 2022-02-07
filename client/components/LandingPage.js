import React, { Component } from 'react';
import { uid } from 'uid';
import socket from '../socket';
import { createAvatar } from '@dicebear/avatars';
import * as style from '@dicebear/adventurer';
import { Form, Button } from 'react-bootstrap';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      nickname: 'Cooldude42',
      avatarSeed: '',
      roomId: '',
      socket: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.generateAvatar = this.generateAvatar.bind(this);
  }

  componentDidMount() {
    this.setState({
      socket: socket,
    });

    const room = this.props.location.search.substring(1);
    console.log(room);
    if (!room) {
      const newRoomId = uid();
      this.setState({
        roomId: newRoomId,
      });
    } else {
      this.setState({
        roomId: room,
      });
    }
    this.generateAvatar();
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.state.socket.emit('join-room', this.state.roomId);
    window.localStorage.setItem('roomId', this.state.roomId);
    window.localStorage.setItem('avatar', this.state.avatar);
    window.localStorage.setItem('nickname', this.state.nickname);
    this.props.history.push('/lobby');
  }

  generateAvatar() {
    const newAvatar = createAvatar(style, {
      dataUri: true,
      size: 128,
    });
    this.setState({
      avatarSeed: newAvatar,
    });
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.currentTarget.value,
    });
  }

  render() {
    const { avatarSeed } = this.state;
    const { handleSubmit, handleChange, generateAvatar } = this;
    return (
      <div>
        <div className='logo'>
          <h1>LOGO</h1>
        </div>
        <h3>Welcome to the Drawing Website!</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            type='text'
            name='nickname'
            defaultValue='Cooldude42'
            onChange={handleChange}
          />
          <Form.Label>Avatar</Form.Label>
          <Form.Group>
            <img src={avatarSeed} />
            <Form.Control
              name='avatarSeed'
              onChange={(handleChange, generateAvatar)}
              placeholder='Start writing your custom seed'
            />
          </Form.Group>
          {this.props.location.search.substring(1) ? (
            <Button type='submit'>Join Room</Button>
          ) : (
            <Button type='submit'>Create Room</Button>
          )}
        </Form>
      </div>
    );
  }
}

export default LandingPage;
