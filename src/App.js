import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// redux action
import { verifyAuth } from './actions/authActions';

// stylesheet
import './styles/App.css';

// components
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Friends from './components/Friends';
import Newsfeed from './components/Newsfeed';
import Navbar from './components/layout/Navbar';
import PrivateRoute from './components/PrivateRoute';

function App({ auth, verifyAuth }) {
  useEffect(() => {
    // check once, upon rendering of App, whether user is already authenticated
    verifyAuth();
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
          auth.isAuthenticated && <Navbar />
        }
        <Route exact path="/" render={() => {
          /* display user's newsfeed only if authenticated
          NOTE: PrivateRoute component is not used in this case because the 
          path for Newsfeed and Login is the same */
          if (auth.isAuthenticated) return <Newsfeed />;
          return <Login />;
        }} />
        <Switch>
          <PrivateRoute exact path="/:username" component={Profile} />
          <PrivateRoute exact path="/friends" component={Friends} />
        </Switch>
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
