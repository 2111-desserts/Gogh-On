import React from 'react'
import {connect} from 'react-redux'

/**
 * COMPONENT
 */
export const Home = () => {
  return (
    <div>
      <h3>Welcome to the Drawing Website!</h3>
    </div>
  )
}

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

export default connect(null)(Home)
