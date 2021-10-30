import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { verifyAuth } from './actions/authActions';

// stylesheet
import './styles/App.css';

// components
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Friends from './components/Friends';
import Newsfeed from './components/Newsfeed';
import Navbar from './components/layout/Navbar';

function App(props) {
  useEffect(() => {
    // check once, upon rendering of App, whether user is already authenticated
    props.verifyAuth();
  }, []);

  const getUserProfile = () => {
    axios.get(`/api/users/username`).then((response) => {
      // do something with response
    }).catch((err) => console.error(err));
  };

  const getFriends = () => {
    axios.get(`/api/users/username/friends`).then((response) => {
      // do something with response
    }).catch((err) => console.error(err));
  };
  
  return (
    <Router>
      <div className="App">
        {
          /* display navigation bar only if user is authenticated, as it doesn't
          appear on sign in page */
          props.auth.isAuthenticated && <Navbar />
        }
        <Route exact path="/" render={() => {
          // display user's newsfeed only if authenticated
          if (props.auth.isAuthenticated) return <Newsfeed />;
          return <Login />;
        }} />
        <Route exact path="/:username" render={(props) => {
          // pass in props to be able to access "match" property that contains
          // the URI's parameter
          <Profile {...props} />
        }} />
        <Route exact path="/friends" component={Friends} />
      </div>
    </Router>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  verifyAuth: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps, { verifyAuth })(App);
