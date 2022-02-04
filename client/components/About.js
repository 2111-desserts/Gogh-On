import React, {Component} from 'react'
import ReactPlayer from 'react-player'

class About extends Component{
    
    render(){
        return(
                <div>
                    <h1>ABOUT [app name]</h1>
                    <h3>GH CAPSTONE PROJECT: TEAM DESSERTS! </h3>
                    <h4>Ataa Amanda Ellie Quynh</h4>
                    <p>A collaborative drawing space where users can use an online drawing board and express their creativity - together!</p>
                    <p>Create a piece of art with up to 4 friends, where you're all the 'artist'. art-US-ts. (app name subject to discussion/change)</p>
            <ReactPlayer url='https://v16-webapp.tiktok.com/57d9a471cda981ad334487a3269684c7/61fc8c23/video/tos/useast2a/tos-useast2a-ve-0068c003/ac10186c0b6944c79fb051bfde853b00/?a=1988&br=5816&bt=2908&cd=0%7C0%7C1%7C0&ch=0&cr=0&cs=0&cv=1&dr=0&ds=3&er=&ft=XOQ9-3E7nz7ThCQJxlXq&l=20220203201451010189077022242C4F73&lr=tiktok_m&mime_type=video_mp4&net=0&pl=0&qs=0&rc=amVtcDg6Zjo4OjMzNzgzM0ApNjs7ZTQ4OTs0Nzc2N2RoZWdibC4xcjQwcmZgLS1kLzZzczFiXzRiMmMtLy82MTUvXi06Yw%3D%3D&vl=&vr=' width="10%" height="10%" controls={true}/>
                </div>
        )
        
    }
}


export default (About)