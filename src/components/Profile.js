/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { Switch, Route, NavLink } from "react-router-dom";

// stylesheet
import '../styles/Profile.css';

// bootstrap components
import Button from 'react-bootstrap/Button';

// redux actions
import { getPosts } from '../actions/postActions';
import { 
  saveFriends, 
  sendFriendRequest, 
  deleteFriend, 
  acceptFriendRequest, 
  cancelFriendRequest
} from "../actions/friendActions";

// components
import ProfilePosts from "./ProfilePosts";
import ProfileFriends from "./ProfileFriends";

function Profile({ 
  match, 
  getPosts, 
  posts, 
  auth, 
  saveFriends, 
  friends, 
  sendFriendRequest,
  deleteFriend,
  acceptFriendRequest
}) {
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
      console.log(err);
    });
  }, []);

  const handleAddFriend = () => {
    const body = {
      friendId: user.id
    };
    
    sendFriendRequest(body, auth.user.username, user);
  };

  const handleDeleteFriend = () => {
    deleteFriend(user.id);
  };

  const handleAcceptRequest = () => {
    const body = {
      friendId: user.id
    };

    acceptFriendRequest(body, auth.user.username);
  };

  const handleCancelRequest = () => {
    cancelFriendRequest(auth.user.username, user.id);
  };

  const renderFriendButton = () => {
    if (auth.user.id !== user.id) {
      if (friends[auth.user.id]) {
        return <Button onClick={handleDeleteFriend}>Unfriend</Button>;
      } else if (auth.user.incomingFriendRequests[user.id]) {
        return <Button onClick={handleAcceptRequest}>Accept friend request</Button>;
      } else if (auth.user.outgoingFriendRequests[user.id]) {
        return <Button onClik={handleCancelRequest}>Cancel friend request</Button>;
      } else {
        return <Button onClick={handleAddFriend}>Add as friend</Button>;
      }
    } else {
      return null;
    }
  };
  
  return (
    <div className="profile">
      {
        user.name !== undefined
          ? <>
              <header className="profile-header primary-bg-color quinary-frame">
                <h1>{user.name}</h1>
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
                  {
                    renderFriendButton()
                  }
                </div>
              </header>
              <main>
                <Switch>
                  <Route exact path="/:username" render={() => (
                    <ProfilePosts user={user} posts={posts} />
                  )} />
                  <Route path="/:username/friends" render={() => (
                    <ProfileFriends friends={user.friends} />
                  )} />
                </Switch>
              </main>
            </>
          : <>
              Loading...
            </>
      }
    </div>
  );
}

Profile.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  saveFriends: PropTypes.func.isRequired,
  sendFriendRequest: PropTypes.func.isRequired,
  deleteFriend: PropTypes.func.isRequired,
  acceptFriendRequest: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth,
  friends: state.friends
});

export default connect(mapStateToProps, { 
  getPosts, 
  saveFriends,
  sendFriendRequest,
  deleteFriend,
  acceptFriendRequest,
})(Profile);