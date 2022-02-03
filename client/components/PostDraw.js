import React, { Component } from "react";
import { Link } from "react-router-dom";

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  // delete link;
}

class PostDraw extends Component {
  constructor(props){
    super(props)
  }

  saveImage(){
    const exportedURI = window.localStorage.dataURI;
    downloadURI(exportedURI, 'another_test.png')
  }

  render(){
    return(
      <div id="post-draw-container">
        <h2>Thanks for Drawing!</h2>
        <div className="final-image">
          <img src={window.localStorage.dataURI} />
        </div>
        <button onClick={this.saveImage}>okay i like it, picasso</button>
        <Link to ='/'>
          <button>Start a New Draw Session</button>
        </Link>
      </div>
    )
  }
}

export default PostDraw
