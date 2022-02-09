import React, {Component} from 'react'
import ReactPlayer from 'react-player'

class About extends Component{
    
    render(){
        return(
                <div>
                    <center>
                    <h1>about <b><i>GOGH ON!</i></b></h1>
                    <h4>GH CAPSTONE PROJECT: TEAM DESSERTS! </h4>
                    <h4>Ataa Amanda Ellie Quynh</h4>
                    <p>A virtual collaborative drawing space where users express their creativity - together!</p>
                    <p>Create a piece of art with up to 4 friends</p>
                    </center>

                    <div>
                        <b>CURRENT FEATURES:</b> 
                            <ul>
                                <li>generate an avatar</li>
                                <li>create a room</li>
                                <li>generate a link to the room (to copy/paste to friends)</li>
                                <li>chat with users in your room (while you wait for everyone to join)</li>
                                <li>START your session (more modes in prog), where you can continue chatting, and start drawing!</li>
                                <li>When you're done:
                                    <ul>
                                        <li>END your session by pressing 'end session' in your drawing toolbox</li>
                                        <li>SAVE your piece to your computer, or scrap it/start a new session!</li>
                                    </ul> 
                                </li>
                            </ul>
                    </div>
                    <p>(game modes in progress)</p>
            {/* <ReactPlayer url='https://v16-webapp.tiktok.com/57d9a471cda981ad334487a3269684c7/61fc8c23/video/tos/useast2a/tos-useast2a-ve-0068c003/ac10186c0b6944c79fb051bfde853b00/?a=1988&br=5816&bt=2908&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=XOQ9-3E7nz7ThCQJxlXq&l=20220203201451010189077022242C4F73&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amVtcDg6Zjo4OjMzNzgzM0ApNjs7ZTQ4OTs0Nzc2N2RoZWdibC4xcjQwcmZgLS1kLzZzczFiXzRiMmMtLy82MTUvXi06Yw%3D%3D&vl=&vr=' width="10%" height="10%" controls={true}/> */}
                </div>
        )
        
    }
}

//new bug - TIK TOK VID isn't working now! Currently commented out/I think.. we will live.

export default (About)