import React, { Component } from "react";
import {Howl} from 'howler';
import Chat from './Chat/Chat'
import { Link } from "react-router-dom";
import socket from '../socket'

const audioClip = {
  sound: 'https://algorithmic-8ball.neocities.org/team_dessert/button_START.mp3'
}


const dummyUsers = [
  {nickname: "ataa", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
  {nickname: "ellie", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
  {nickname: "amanda", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
  {nickname: "quynh", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
]

const dummySettings = [
  {name: "normal", image: "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/artist-palette.png", description: "loren ipsum"},
  {name: "timed", image: "http://s3.amazonaws.com/pix.iemoji.com/images/emoji/apple/ios-12/256/artist-palette.png", description: "loren ipsum"},
]
class Lobby extends Component{
  constructor(){
    super()
    this.state ={
      sound: false
    }
    this.handleClick = this.handleClick.bind(this)
    this.startSession = this.startSession.bind(this)
  }

  componentDidMount(){
    socket.on('new-user', (roomId) =>{
      console.log(`New user has joined room ${roomId}`)
    })
  }

  soundPlay(src){
    const sound = new Howl({
      src,
      html5: true
    })
    sound.play();
  }

  handleClick(){
    const roomId = window.localStorage.getItem('roomId')
    //ATM it's written to adjust to localhost site hosting rather than heroku
    // navigator.clipboard.writeText("localhost:8080/?"+roomId)
    navigator.clipboard.writeText(`${window.location.host}/?`+roomId)
    //for heroku:
    // navigator.clipboard.writeText("artusts.herokuapp.com/?"+roomId)



    this.setState.sound = true;
    this.soundPlay(audioClip.sound);
  }

  startSession(){
    this.setState.sound = true;
    this.soundPlay(audioClip.sound);
  }


  render(){
    let users = dummyUsers;
    let settings = dummySettings

    return(
      <div id="lobby-room">
        <div className="logo">logo</div>
        <div className="users">
          {users.map((user) => {
            return(
              <div>
                <img src={user.avatar} width="200px" />
              </div>)
            })}
        </div>

        <div className="draw-session-settings">{settings.map((setting) => {
          return(<div>
            <img src={setting.image} width="200px" />
            <p>{setting.name}</p>
          </div>)
        })}</div>
        <Chat />
        <button className="session-link" type='button' onClick={() => this.handleClick()}>Copy Invite Link</button>
        <Link to="./freeDraw"><button type='button' onClick={() => this.startSession()}>Start Session</button></Link>
      </div>
    )
  }
}

export default Lobby
