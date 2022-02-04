import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { withRouter, Route, Switch, Redirect } from 'react-router-dom';
import Home from './components/Home';
import PostDraw from './components/PostDraw';
import Lobby from './components/Lobby';
import LandingPage from './components/LandingPage';
import Settings from './components/Settings';
import {me} from './store'
import Main from './components/DrawingLobby/Main';
import Chat from './components/Chat/Chat'


/**
 * COMPONENT
 */
class Routes extends Component {
  constructor(props){
    super(props);
  }
  componentDidMount() {
    this.props.loadInitialData();
    console.log("props:",this.props)
  }

  render() {
    const {socket} = this.props;
    // console.log("socket:",socket)
    return (
      <div>
        <Switch>
          <Route exact path ='/' component={Home}/>
          {/* <Route exact path ='/landing' component = {LandingPage} /> */}
          <Route exact path ='/landing'> 
            <LandingPage socket = {socket}/> 
          </Route>
          <Route path = '/landing/:roomId' component = {LandingPage}/>
          <Route exact path ='/settings' component = {Settings}/>
          <Route path='/canvas' component={Main} />
          <Route path='/chat' component={Chat} />
          <Route path='/lobby' component={Lobby} />
          <Route path='/postdraw' component={PostDraw} />
        </Switch>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.auth that has a truthy id.
    // Otherwise, state.auth will be an empty object, and state.auth.id will be falsey
    isLoggedIn: !!state.auth.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes));
