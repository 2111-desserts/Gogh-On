import React, { Component } from "react";
import Chat from './Chat/Chat'
import { Link } from "react-router-dom";
import socket from '../socket'


class Lobby extends Component{
  constructor(){
    super()
    this.state ={
      players: [],
      selectedMode:'freeDraw',
      host:'',
      gameMode:
      [
        {name: "Free Draw", image: "/mode1.png", identity:"freeDraw", description: "loren ipsum"},
        {name: "Hot Potato", image: "/mode2.png", identity:"hotPotato", description: "loren ipsum"},
      ]
    }
    this.handleClick = this.handleClick.bind(this)
    this.startSession = this.startSession.bind(this)
    this.selectMode = this.selectMode.bind(this)
    this.loadUsers = this.loadUsers.bind(this)
  }

  componentDidMount(){
    this.loadUsers();
    const room = window.localStorage.getItem('roomId');
    socket.emit('get-host',room);
    socket.on('render-users',(playerInfo)=>{
      this.setState({
        players:playerInfo
      })
    })
    socket.on('set-host',(host)=>{
      this.setState({
        host:host
      })
    })
    socket.on('update-users', () =>{
      this.loadUsers();
    });
    socket.on('begin-session', (mode) => {
      this.props.history.push(`/${mode}/${room}`);
    })
  }

  loadUsers(){
    const roomId = window.localStorage.getItem('roomId')
    socket.emit('load-users',roomId);
  }

  handleClick(){
    const roomId = window.localStorage.getItem('roomId')
    navigator.clipboard.writeText(`${window.location.host}/?`+roomId)
  }

  selectMode(mode){
    this.setState({
      selectedMode:mode
    })
  }

  startSession(){
    const roomId = window.localStorage.getItem('roomId')
    const mode = this.state.selectedMode;
    socket.emit('start-session', roomId, mode);
  }
  
  render(){
    const { players, gameMode, selectedMode, host } = this.state
    console.log("host is ", host);
    const room = window.localStorage.getItem('roomId');
    const isUserHost = window.localStorage.getItem('host')
    return(
      <div id="lobby-room">
        <div className="logo">logo</div>
        <div className="users">
          {players.map((player, ind) => {
            return(
              <div key = {ind}>
                <img src={`https://avatars.dicebear.com/api/adventurer/${player.avatar}.svg`} width="200px" />
                <p>{player.nickname}</p>
              </div>
            );
          })}
        </div>

        <div className="draw-session-settings">{gameMode.map((mode, ind) => {
          return(
          <div key={ind} onClick={()=>this.selectMode(mode.identity)}>
            <img src={mode.image} width="200px" />
            <p>{mode.name}</p>
          </div>)
        })}</div>
        <Chat />
        <button
          className='session-link'
          type='button'
          onClick={() => this.handleClick()}
        >
          Copy Invite Link
        </button>
        {isUserHost === 'true' ? (
          <Link to={`/${selectedMode}/${room}`}>
            <button type='button' onClick={() => this.startSession()}>Start Session</button>
          </Link>
        ):(<br/>)} 
      </div>
    );
  }
}

export default Lobby;
