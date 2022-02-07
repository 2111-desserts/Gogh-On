import React, { Component } from 'react';
import { Form, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { uid } from 'uid';
import socket from '../socket';
import { avatars } from './Avatars';
import RandomAva from '../../public/icons/randomAva.svg';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      nickname: '',
      avatar: '',
      roomId: '',
      socket: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAvatar = this.handleAvatar.bind(this);
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

    this.setState({
      avatar: avatars[0],
    });
  }

  handleChange(evt) {
    this.setState({
      nickname: evt.currentTarget.value,
    });
  }

  handleAvatar() {
    let avatarLength = avatars.length;
    this.setState({
      avatar: avatars[Math.floor(Math.random() * avatarLength)],
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.state.socket.emit('join-room', this.state.roomId);
    window.localStorage.setItem('roomId', this.state.roomId);
    window.localStorage.setItem('nickname', this.state.nickname);
    window.localStorage.setItem('avatar', this.state.avatar);
    this.props.history.push('/lobby');
  }

  render() {
    const { nickname, avatar, roomId } = this.state;
    const { handleSubmit, handleAvatar, handleChange } = this;
    return (
      //   <div>
      //     <div className='logo'>
      //       <h1>LOGO</h1>
      //     </div>
      //     <h3>Welcome to the Drawing Website!</h3>
      //     <div>
      //       <form id='player-info' onSubmit={handleSubmit}>
      //         <label htmlFor='nickname'>Nickname:</label>
      //         <input name='nickname' onChange={handleChange} value={nickname} />

      //         <label htmlFor='avatar'>Avatar Color:</label>
      //         <input name='avatar' onChange={handleChange} value={avatar} />
      //         {this.props.location.search.substring(1) ? (
      //           <button type='sumbit'>Join Room</button>
      //         ) : (
      //           <button type='sumbit'>Create Room</button>
      //         )}
      //       </form>
      //     </div>
      //   </div>
      <>
        <div className='logo'>
          <h1>LOGO</h1>
        </div>
        <h3>Welcome to the Drawing Website!</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Label>Nickname</Form.Label>
          <Form.Control
            type='text'
            defaultValue='Cooldude42'
            onChange={handleChange}
          />
          <Form.Label>Avatar</Form.Label>
          <Form.Group>
            <img src={avatar} alt='avatar' width='156px' height='182px' />
            <OverlayTrigger
              placement='bottom'
              overlay={
                <Tooltip id='button-tooltip-2'>
                  Click for a random avatar!
                </Tooltip>
              }
            >
              <Button type='button' onClick={handleAvatar}>
                <RandomAva />
              </Button>
            </OverlayTrigger>
          </Form.Group>
          {this.props.location.search.substring(1) ? (
            <Button type='submit'>Join Room</Button>
          ) : (
            <Button type='submit'>Create Room</Button>
          )}
        </Form>
      </>
    );
  }
}

export default LandingPage;
