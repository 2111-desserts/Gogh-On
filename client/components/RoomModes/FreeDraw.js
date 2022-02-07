import React, { Component } from 'react'
import DrawingCanvas from "../DrawingLobby/DrawingCanvas";
import Chat from "../Chat/Chat"

class FreeDraw extends Component {

    render(){
        return(
            <div>
            <div><DrawingCanvas/></div>
            <div><Chat /></div>
            </div>
        )
    }
}

export default FreeDraw