//Create and send NEW message
import React, { Component } from 'react'
import PropTypes from 'prop-types'

class MessageForm extends Component {
  static propTypes = {
    onMessageSend: PropTypes.func.isRequired,
  }

  componentDidMount = () => {
    // .focus() method sets focus on the specified element, if it can be focused. 
    // The focused element is the element which will receive keyboard and similar events by default.
    this.input.focus()
  }

  handleFormSubmit = (event) => {
    //prevent the default form submit
    event.preventDefault()

    // pass the current value of the text input to the onMessageSend function
    this.props.onMessageSend(this.input.value)

    //reset the value of the text input to an empty string.
    this.input.value = ""
  }

  render() {
    return (
      <form className="MessageForm" onSubmit={this.handleFormSubmit}>
        <div className="input-container">
          <input
            type="text"
            ref={(node) => (this.input = node)}
            placeholder="Enter your message..."
          />
        </div>
        <div className="button-container">
          <button type="submit">
            Send
          </button>
        </div>
      </form>
    )
  }
}

export default MessageForm