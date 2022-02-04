import React, { Component } from 'react'
import MessageForm from './MessageForm'
import MessageList from './MessageList'
import socket from '../../socket'

class Chat extends Component {
  constructor(props) {
    super(props)
    this.state = {
      messages: []
    }
  }

  componentDidMount(){
    socket.on('receive-message', (message, sendingUser)=>{
      this.setState({
        messages: [...this.state.messages, { me: false, author: "otheruser", body: message }]
      })
    })
  }

  handleNewMessage = (text) => {
    this.setState({
      messages: [...this.state.messages, { me: true, author: "Me", body: text }],
    })
    const sendingUser = window.localStorage.getItem('nickname')
    socket.emit('send-message', text, sendingUser);
  }

  render() {
    return (
      <div className="Chat">
        <div className='header'>Live Chat</div>
        {/* Will render list of all messages sent */}
        <MessageList messages={this.state.messages} />
        {/* Will render the INPUT text to submit new messages to the 'message list': */}
        <MessageForm onMessageSend={this.handleNewMessage} />
      </div>
    )
  }
}

export default Chat