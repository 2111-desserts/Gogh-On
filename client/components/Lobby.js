import React, { Component } from "react";

const dummyUsers = [
  {nickname: "ataa", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
  {nickname: "ellie", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
  {nickname: "amanda", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
  {nickname: "quynh", avatar: "https://ih1.redbubble.net/image.399793925.2011/flat,128x,075,f-pad,128x128,f8f8f8.u4.jpg"},
]

class Lobby extends Component{
  constructor(){
    super()
  }

  render(){
    let users = dummyUsers;

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
        <div className="draw-session-settings">container for session goes here</div>
        <div className="session-link">url session link goes here</div>
      </div>
    )
  }
}

export default Lobby
