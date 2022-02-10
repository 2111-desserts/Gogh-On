import React, { Component } from 'react';
import MessageForm from './MessageForm';
import MessageList from './MessageList';
import socket from '../../socket';

class Chat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    socket.on('receive-message', (message, sendingUser, room) => {
      this.setState({
        messages: [
          ...this.state.messages,
          { me: false, author: sendingUser, body: message, room: room },
        ],
      });
    });
  }

  handleNewMessage = (text) => {
    this.setState({
      messages: [
        ...this.state.messages,
        { me: true, author: 'Me', body: text },
      ],
    });
    const sendingUser = window.localStorage.getItem('nickname');
    const room = window.localStorage.getItem('roomId');
    socket.emit('send-message', text, sendingUser, room);
  };

  render() {
    return (
      <div className='Chat'>
        <div className='header'>Live Chat💬</div>
        {/* Will render list of all messages sent */}
        <MessageList messages={this.state.messages} />
        {/* Will render the INPUT text to submit new messages to the 'message list': */}
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    );
  }
}

export default Chat;
