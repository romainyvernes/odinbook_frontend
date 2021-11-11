/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import { getPosts } from '../actions/postActions';

// components
import PostsList from "./PostsList";
import AddPostSection from "./AddPostSection";

function Profile({ match, getPosts, posts, auth }) {
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
    }).catch((err) => {
      console.log(err);
    });
  }, []);
  
  if (user.name !== undefined) {
    return (
      <div>
        <h2>{user.name}</h2>
        <section>
          <h3>Friends</h3>
          <ul>
            {user.friends.slice(0, 9).map((friend) => (
              <li key={friend.username}>{friend.name}</li>
            ))}
          </ul>
        </section>

        <AddPostSection user={user} />

        <section>
          <h3>Posts</h3>
          {posts.length > 0
           ? <PostsList posts={posts} />
           : "You don't have any posts yet." 
          }
        </section>
      </div>
    );
  } else {
    return (
      <div>Loading...</div>
    );
  }
}

Profile.propTypes = {
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  posts: state.posts,
  auth: state.auth
});

export default connect(mapStateToProps, { getPosts })(Profile);