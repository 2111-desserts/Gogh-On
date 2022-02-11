import React, { Component } from 'react';
import socket from '../socket'
import { Button } from 'react-bootstrap'



export default class Timer extends Component {
    constructor(){
      super()
      this.state = {
        time: {}
      }
    this.timer = 0;
    this.countingDown = false
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    }

    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));

      let divisorForMinutes = secs % (60 * 60);
      let minutes = Math.floor(divisorForMinutes / 60);

      let divisorForSeconds = divisorForMinutes % 60;
      let seconds = Math.ceil(divisorForSeconds);

      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }

  componentDidMount(){
      socket.on('timer', this.startTimer());
    }

    startTimer() {
      this.countingDown = true;
      if (this.countingDown) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }

    countDown() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds - 1;
      let points = this.state.points -10;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
        points: points
      });

      if (seconds === 0) {
        clearInterval(this.timer);
        this.timer = 0;
        this.countingDown = false;
        this.setState({seconds: this.props.seconds, time: this.secondsToTime(this.props.seconds), points: 900});
        // sending rotation to socket
        // if(this.props.isDrawer){
        //   this.setState({
        //     visible: true
        //   })
        //   let rotNum = this.props.curRot
        //   rotNum += 1
        //   setTimeout(() => {socket.emit('rotation', rotNum, this.props.roomNum)}, 750);
        // }
      }


    }

    render() {

      return(
        <div className='buttonContainer'>
          <Button
          color='secondary'
          style={{backgroundColor: "green"}}
          variant='contained'
          size='medium'
          onClick={this.startTimer}>
            START
          </Button>

          <h2 className='points-word'> TIME LEFT: 0</h2>
        </div>
      );
    }

}