import React, { Component } from "react";
import { Link } from "react-router-dom";


class Error extends Component {
    constructor(props){
        super(props)
        this.state = {
            errorMessage:''
        }
    }

    componentDidMount(){
        this.setState({
            errorMessage:this.props.errorMessage
        })
    }

    render(){
        const {errorMessage} = this.state;
        return(
        <div>
            <h1>ERROR!</h1>
            {errorMessage ? (
                <h3>{errorMessage}</h3>
            ):(
            <h3>Sorry, there seems to have been an error :(</h3>
            )}
            <Link to='/'>
                <button>Return to home</button>
            </Link>
        </div>
        )
    }
}

export default Error
