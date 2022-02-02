import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'


class LandingPage extends Component{
    constructor(){
        super()
        this.state = {
            nickname:'',
            avatar:'',
            roomId:''
        }

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        const room = this.props.match.params.roomId;
        this.setState({
            roomId:room
        })
    }

    handleChange(evt) {
        this.setState({
          [evt.target.name]: evt.target.value,
        });
      }

    render(){
        const {nickname,avatar, roomId} = this.state;
        const {handleChange} = this;
        
        //logic - if (room) => button would be join rather than create
        return(
            <div>
                <div className = 'logo'>
                    <h1>LOGO</h1>   
                </div>
                <div>
                    <form id='player-info'>
                        <label htmlFor='nickname'>Nickname:</label>
                        <input name = 'nickname' onChange={handleChange} value={nickname}/>

                        <label htmlFor='avatar'>Avatar Color:</label>
                        <input name = 'avatar' onChange={handleChange} value={avatar}/>
                        {roomId ? (
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