import React, { Component } from 'react';
import socket from '../socket'
import { Button } from 'react-bootstrap'



export default class Timer extends Component {
    constructor(props){
      super(props)
      this.state = {
        time: {},
        seconds: this.props.seconds
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
      // let user = window.localStorage.getItem('avatar');
      socket.on('starting-timer', this.startTimer());

    }

    startTimer() {
      console.log("i am starting the timer this is the startTimer function");
      this.countingDown = true;
      if (this.countingDown) {
        this.timer = setInterval(this.countDown, 1000);
      }
    }


    countDown() {
      // Remove one second, set state so a re-render happens.
      console.log(this.state.seconds, "seconds")
      let seconds = this.state.seconds - 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      });

      if (seconds === 0) {
        // clearInterval(this.timer);
        this.timer = 0;
        this.countingDown = false;
        this.setState({seconds: 15, time: this.secondsToTime(15)});

      }


    }

    render() {

      return(
        <div className='buttonContainer'>

          <h2 className='points-word'> TIME LEFT: {this.state.seconds}</h2>
        </div>


      );
    }

}
