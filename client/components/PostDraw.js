import React, { Component } from "react";
import { Link } from "react-router-dom";

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
        <Link to ='/'>
          <button>Start a New Draw Session</button>
        </Link>
      </div>
    )
  }
}

export default PostDraw
