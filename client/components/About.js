import React, { Component } from 'react';

class About extends Component {
  render() {
    return (
      <div>
        <center>
          <h1>
            about{' '}
            <b>
              <i>GOGH ON!</i>
            </b>
          </h1>
          <h4>GH CAPSTONE PROJECT: TEAM DESSERTS! </h4>
          <h4>Ataa Amanda Ellie Quynh</h4>
          <p>
            A virtual collaborative drawing space where users express their
            creativity - together!
          </p>
          <p>Create a piece of art with up to 4 friends</p>
        </center>

        <div>
          <b>CURRENT FEATURES:</b>
          <ul>
            <li>generate an avatar</li>
            <li>create a room</li>
            <li>generate a link to the room (to copy/paste to friends)</li>
            <li>
              chat with users in your room (while you wait for everyone to join)
            </li>
            <li>
              START your session (more modes in prog), where you can continue
              chatting, and start drawing!
            </li>
            <li>
              When you're done:
              <ul>
                <li>
                  END your session by pressing 'end session' in your drawing
                  toolbox
                </li>
                <li>
                  SAVE your piece to your computer, or scrap it/start a new
                  session!
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <p>(game modes in progress)</p>
      </div>
    );
  }
}

//new bug - TIK TOK VID isn't working now! Currently commented out/I think.. we will live.

export default About;
