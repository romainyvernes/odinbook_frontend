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
import { Modal } from 'react-bootstrap';

// redux action
import { verifyAuth } from './actions/authActions';
import { disablePostForm, disableReactionsList } from './actions/overlaysActions';

// stylesheet
import './styles/App.css';

// components
import Profile from './components/Profile';
import Login from './components/auth/Login';
import Friends from './components/Friends';
import Newsfeed from './components/Newsfeed';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import PostForm from './components/PostForm';
import ReactionsList from './components/ReactionsList';

function App({ 
  auth, 
  verifyAuth, 
  errors, 
  overlays,
  disablePostForm,
  disableReactionsList,
}) {
  
  useEffect(() => {
    // check once, upon rendering of App, whether user is already authenticated
    verifyAuth();
  }, []);

  const { postForm, reactionsList } = overlays;

  const handleHideModal = () => {
    if (postForm.isEnabled) {
      disablePostForm();
    }
    if (reactionsList.isEnabled) {
      disableReactionsList();
    }
  };

  const handleShowModal = () => {
    const overlayKeys = Object.keys(overlays);

    for (let key of overlayKeys) {
      if (overlays[key].isEnabled) {
        return true;
      }
    }
    
    return false;
  };
  
  return (
    <Router>
      <div className="App">
        <Modal show={handleShowModal()} 
              onHide={handleHideModal}
              backdropClassName="overlay-bg"
              dialogClassName="quaternary-frame">
          {
            postForm.isEnabled && <PostForm />
          }
          {
            reactionsList.isEnabled && <ReactionsList />
          }
        </Modal>
        
        {
          auth.isAuthenticated
           ? <>
              <Navbar />
              <Switch>
                <Route exact path="/" render={() => <Newsfeed key={uuid()} />} />
                <PrivateRoute exact path="/friends" component={Friends} />
                <PrivateRoute exact path="/:username" component={Profile} />
              </Switch>
             </>
           : <Route exact path="/" component={Login} />
        }
      </div>
    </Router>
  );
}

App.propTypes = {
  auth: PropTypes.object.isRequired,
  verifyAuth: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  overlays: PropTypes.object.isRequired,
  disablePostForm: PropTypes.func.isRequired,
  disableReactionsList: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    errors: state.errors,
    overlays: state.overlays
  };
};

export default connect(mapStateToProps, { 
  verifyAuth,
  disablePostForm,
  disableReactionsList,
})(App);
