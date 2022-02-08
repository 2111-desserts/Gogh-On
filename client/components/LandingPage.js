import React, { Component } from 'react'
import { uid } from 'uid'
import socket from '../socket'
import { Form, Button} from 'react-bootstrap';

class LandingPage extends Component {
  constructor() {
    super();
    this.state = {
      avatarSeed: 'seed',
      nickname: 'Cooldude42',
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
      });
    } else {
      this.setState({
        roomId: room,
      });
    }
  }

  handleSubmit(evt) {
    evt.preventDefault();
    this.state.socket.emit('join-room', this.state.roomId);
    window.localStorage.setItem('roomId', this.state.roomId);
    window.localStorage.setItem('avatar', this.state.avatar);
    window.localStorage.setItem('nickname', this.state.nickname);
    // this.props.history.push('/lobby');
    this.props.history.push(`/lobby/${this.state.roomId}`);

    // this.props.history.push('/chat');

  }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.currentTarget.value,
        });
        console.log(this.state)
    }
    
  render() {
    const { avatarSeed } = this.state;
    const { handleSubmit, handleChange} = this;
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
                name = 'nickname'
                defaultValue='Cooldude42'
                onChange={handleChange}
                />
                <Form.Label>Avatar</Form.Label>
                <img src={`https://avatars.dicebear.com/api/adventurer/${avatarSeed}.svg`} width ={128}/>
                <Form.Control name = 'avatarSeed' onChange={handleChange} placeholder='Start writing your custom seed'/>

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
