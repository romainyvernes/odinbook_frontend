/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { 
  BrowserRouter as Router, 
  Route, 
  Switch 
} from "react-router-dom";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// use unique IDs to force re-renders of components every time navigation links
// are clicked
import { v4 as uuid } from 'uuid';

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
import PostForm from './components/PostForm';

function App({ auth, verifyAuth, errors, postForm }) {
  useEffect(() => {
    // check once, upon rendering of App, whether user is already authenticated
    verifyAuth();
  }, []);
  
  return (
    <Router>
      <div className="App">
        {
          postForm.isEnabled && <PostForm />
        }
        {
          /* display navigation bar only if user is authenticated, as it doesn't
          appear on sign in page */
          auth.isAuthenticated && <Navbar />
        }
        <Route exact path="/" render={() => {
          /* display user's newsfeed only if authenticated
          NOTE: PrivateRoute component is not used in this case because the 
          path for Newsfeed and Login is the same */
          if (auth.isAuthenticated) return <Newsfeed key={uuid()} />;
          return <Login />;
        }} />
        {
          auth.isAuthenticated && (
            <Switch>
              <PrivateRoute exact path="/friends" component={Friends} />
              <PrivateRoute exact path="/:username" component={Profile} />
            </Switch>
          )
        }
      </div>
    </Router>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  verifyAuth: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  postForm: PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
    postForm: state.postForm
  };
};

export default connect(mapStateToProps, { verifyAuth })(App);
