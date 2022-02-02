// component for an individual message
import React, { Component } from 'react'
import PropTypes from 'prop-types'
// npm install --save classnames
// To style the messages differently,
import classNames from "classnames"
// The classnames library lets us pass both string arguments, and an object with keys and boolean values to the function 
// classNames, and it returns a concatenated string consisting of string values, and any object keys that had 
// truthy values.
// import './Chat.css'


class Message extends Component {
  static propTypes = {
    author: PropTypes.string,
    body: PropTypes.string.isRequired,
    me: PropTypes.bool,
  }

  render() {
    const classes = classNames('Message', {
      log: !this.props.author,
      me: this.props.me
    })

    return (
      <div className={classes}>
        {this.props.author && (
          <span className="author">{this.props.author}:</span>
        )}
        {this.props.body}
      </div>
    )
  }
}

export default Message