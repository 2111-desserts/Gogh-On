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
      gameMode:
      [
        {name: "Free Draw", image: "/mode1.png", identity:"freeDraw", description: "loren ipsum"},
        {name: "Hot Potato", image: "/mode2.png", identity:"hotPotato", description: "loren ipsum"},
      ]
    }
    this.handleClick = this.handleClick.bind(this)
    this.startSession = this.startSession.bind(this)
    this.selectMode = this.selectMode.bind(this)
  }

  componentDidMount(){
    this.loadUsers();
    socket.on('get-info',()=>{
      console.log('getting the info')
      let userInfo = {
        nickname:window.localStorage.getItem('nickname'),
        avatar:window.localStorage.getItem('avatar'),
        host:window.localStorage.getItem('host')
      }
      socket.emit('return-info',userInfo);
    })
    socket.on('render-user',(playerInfo)=>{
      this.setState({
        players:[...this.state.players, playerInfo]
      })
    })
    socket.on('new-user', (player) =>{
      console.log(`New user has joined room ${player.roomId}`)
      this.setState({
        players: [...this.state.players, player],
      });
    });
    socket.on('begin-session', () => {
      this.props.history.push(`/freeDraw/${this.state.roomId}`);
      console.log("working")
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
    console.log(this.state)
  }

  startSession(){
    const roomId = window.localStorage.getItem('roomId')
    socket.emit('start-session', roomId);
    this.props.history.push(`/freeDraw/${roomId}`);
  }
  
  render(){
    const { players, gameMode, selectedMode } = this.state
    const host = window.localStorage.getItem('host')
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
        {host === 'true' ? (
          <Link to={`/${selectedMode}`}>
            <button type='button' onClick={() => this.startSession()}>Start Session</button>
          </Link>
        ):(<br/>)} 
      </div>
    );
  }
}

export default Lobby;
