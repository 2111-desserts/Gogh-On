import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Routes from './Routes';
import io from 'socket.io-client';


class App extends Component {
  state = {
    socket: null
  }

  componentDidMount(){
    this.initSocket()
  }

  initSocket = () =>{
    let socket = io(window.location.origin)
    this.setState({socket})
    socket.on('connect', () => console.log('Connected~'))
    socket.emit('backend-test',"testing if this works");
  }
  render(){
    const {socket} = this.state;
    console.log(socket)
    return (
      <div>
        <Navbar />
        <Routes socket = {socket}/>
      </div>
    )
  }  
}

export default App
