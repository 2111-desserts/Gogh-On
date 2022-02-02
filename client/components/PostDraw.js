import React, { Component } from "react";

class PostDraw extends Component {
  constructor(){
    super()
  }

  render(){
    return(
      <div id="post-draw-container">
        <h2>Thanks For Drawing!</h2>
        <div className="final-image">
          <p>canvas goes here</p>
        </div>
        <button>okay i like it, picasso</button>
        <button>Start a New Draw Session</button>
      </div>
    )
  }
}

export default PostDraw
