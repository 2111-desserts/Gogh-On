import React, {Component} from 'react'
import { connect } from 'react-redux'
import {Link} from 'react-router-dom'


class Settings extends Component{
    constructor(){
        super()
    }
    render(){
        return(
            <div>
                <h1>Settings page</h1>
            </div>
        )
        
    }
}

export default connect(null)(Settings)