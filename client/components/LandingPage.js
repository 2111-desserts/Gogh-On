import React, {Component} from 'react'
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

        const room = this.props.location.search.substring(1);
        console.log(room);
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
        this.state.socket.emit('join-room',this.state.roomId)
        window.localStorage.setItem('roomId',this.state.roomId)
        window.localStorage.setItem('nickname',this.state.nickname)
        this.props.history.push('/lobby')
    }

    render(){
        const {nickname,avatar, roomId} = this.state;
        const {handleChange, handleSubmit} = this;
        return(
            <div>
                <div className = 'logo'>
                    <h1>LOGO</h1>   
                </div>
                <h3>Welcome to the Drawing Website!</h3>
                <div>
                    <form id='player-info' onSubmit={handleSubmit}>
                        <label htmlFor='nickname'>Nickname:</label>
                        <input name = 'nickname' onChange={handleChange} value={nickname}/>

                        <label htmlFor='avatar'>Avatar Color:</label>
                        <input name = 'avatar' onChange={handleChange} value={avatar}/>
                        {this.props.location.search.substring(1) ? (
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

export default (LandingPage)