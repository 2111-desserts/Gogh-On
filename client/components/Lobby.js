import React, { Component } from "react";

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
  }

  render(){
    let users = dummyUsers;
    let settings = dummySettings

    return(
      <div id="lobby-room">
        <div className="logo">logo</div>
        <div className="users">
          {users.map((user) => {
            return(<div>
              <img src={user.avatar} width="200px" />
            </div>)
          }) }
        </div>

        <div className="draw-session-settings">{settings.map((setting) => {
          return(<div>
            <img src={setting.image} width="200px" />
            <p>{setting.name}</p>
          </div>)
        })}</div>
        <div className="session-link">url session link goes here</div>
      </div>
    )
  }
}

export default Lobby
