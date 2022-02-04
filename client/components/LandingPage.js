import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'
import { uid } from 'uid'


class LandingPage extends Component{
    constructor(){
        super()
        this.state = {
            nickname:'coolDude32',
            avatar:'',
            roomId:'',
            socket:null
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount(){
        console.log(this.props)
        //const room = this.props.match.params.roomId;
        let {socket} = this.props
        this.setState({
            socket:socket
        })
        // if(!room){
        //     const newRoomId = uid();
        //     this.setState({
        //         roomId:newRoomId
        //     })
        // }
        // else{
        //     this.setState({
        //         roomId:room
        //     })
        // }
    }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
    }

    handleSubmit(evt) {
        evt.preventDefault();
        console.log("handleing sumbit")
        this.socket.emit('join-room',this.roomId)
      }

    render(){
        const {nickname,avatar, roomId} = this.state;
        const {handleChange, handleSubmit} = this;

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
                        {roomId ? (
                            <Link to='/lobby'>
                                <button type = 'sumbit'>Join Room</button>
                            </Link>
                        ) :(
                            <Link to='/lobby'>
                                <button type = 'sumbit'>Create Room</button>
                            </Link>
                        )}
                        
                    </form>
                </div>
            </div> 
        ) 
    }
}

export default connect(null)(LandingPage)