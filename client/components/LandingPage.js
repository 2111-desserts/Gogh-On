import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { uid } from 'uid'
import socket from '../socket'

class LandingPage extends Component{
    constructor(){
        super()
        this.state = {
            nickname:'coolDude42',
            avatar:'',
            roomId:'',
            socket:null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        this.setState({
            socket:socket
        })

        const room = this.props.match.params.roomId;
        if(!room){
            const newRoomId = uid();
            this.setState({
                roomId:newRoomId
            })
        }
        else{
            this.setState({
                roomId:room
            })
        }
    }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log("handeling submit")
        this.state.socket.emit('join-room',this.state.roomId)
        window.localStorage.setItem('roomId',this.state.roomId)
        this.props.history.push('/lobby')
    }

    render(){
        const {nickname,avatar, roomId} = this.state;
        const {handleChange, handleSubmit} = this;
        console.log(this.state)
        return(
            <div>
                <div className = 'logo'>
                    <h1>LOGO</h1>   
                </div>
                <div>
                    <form id='player-info' onSubmit={handleSubmit}>
                        <label htmlFor='nickname'>Nickname:</label>
                        <input name = 'nickname' onChange={handleChange} value={nickname}/>

                        <label htmlFor='avatar'>Avatar Color:</label>
                        <input name = 'avatar' onChange={handleChange} value={avatar}/>
                        {this.props.match.params.roomId ? (
                            <button type = 'sumbit'>Join Room</button>
                        ) :(
                            <button type = 'sumbit'>Create Room</button>
                        )}
                        
                    </form>
                </div>
            </div> 
        ) 
    }
}

export default connect(null)(LandingPage)