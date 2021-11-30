/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { connect, useDispatch } from "react-redux";
import PropTypes from 'prop-types';
import { Switch, Route, NavLink } from "react-router-dom";

// stylesheet
import '../styles/Profile.css';

// redux action types
import { GET_ERRORS } from '../actions/types';

// redux actions
import { getPosts } from '../actions/postActions';
import { 
  saveFriends,
} from "../actions/friendActions";

// bootstrap components
import Spinner from 'react-bootstrap/Spinner';

// components
import ProfilePosts from "./ProfilePosts";
import ProfileFriends from "./ProfileFriends";
import FriendButton from "./FriendButton";

function Profile({ 
  match, 
  getPosts, 
  posts,
  saveFriends,
  auth 
}) {
  const dispatch = useDispatch();
  const [user, setUser] = useState({});
  
  // retrieve user info, posts, and comments upon mounting
  useEffect(() => {
    /* params property of the match object refers to parameters set in route URI
    NOTE: API call is made locally rather than in redux action because the route
    differs in each component where posts appear */
    axios.get(`/api/users/${match.params.username}`).then((response) => {
      // save info about owner of profile displayed to local state
      setUser(response.data.user);
      
      // save posts being displayed to redux store
      getPosts(response.data.posts);
      
      // save friends to redux store
      saveFriends(response.data.user.friends);
    }).catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err
      });
    });
  }, []);
  
  return (
    <div className="profile">
      {
        user.name !== undefined
          ? <>
              <header className="profile-header primary-bg-color quinary-frame">
                <div>
                  <button>
                    <img src={auth.user.picture.url} 
                          alt="user's profile avatar"
                          className="user-picture" />
                  </button>
                  <h1>{user.name}</h1>
                </div>
                <div className="profile-nav">
                  <ul className="navigation-links">
                    <li>
                      <NavLink exact to={`/${user.username}`} 
                              activeClassName="selected" 
                              className="nav-link hovered-link light-bold">
                        Posts
                      </NavLink>
                    </li>
                    <li>
                      <NavLink exact to={`/${user.username}/friends`} 
                              activeClassName="selected" 
                              className="nav-link hovered-link light-bold">
                        Friends
                      </NavLink>
                    </li>
                  </ul>
                  <div>
                    <FriendButton parent={user} />
                  </div>
                </div>
              </header>
              <main>
                <Switch>
                  <Route exact path="/:username" render={() => (
                    <ProfilePosts user={user} />
                  )} />
                  <Route path="/:username/friends" render={() => (
                    <ProfileFriends user={user} />
                  )} />
                </Switch>
              </main>
            </>
          : <>
              <Spinner variant="primary" animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </>
      }
    </div>
  );
}

Profile.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  saveFriends: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
});

export default connect(mapStateToProps, { 
  getPosts, 
  saveFriends,
})(Profile);