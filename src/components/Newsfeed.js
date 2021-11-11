/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import PostsList from './PostsList';
import { getPosts } from '../actions/postActions';

// components
import AddPostSection from './AddPostSection';

// component to display recent posts by any user on the platform
function Newsfeed({ auth, getPosts, posts }) {
  // retrieve recent posts from API upon mounting
  useEffect(() => {
    /* NOTE: API call is made locally rather than in redux action because the 
    route differs in each component where posts appear */
    axios.get('/api/posts?recent=true').then((response) => {
      // save posts being displayed to redux store
      getPosts(response.data);
    }).catch((err) => {
      console.log(err);
    });
  }, []);

  return (
    <div>
      <AddPostSection />
      
      {
        posts.length > 0
          ? <PostsList posts={posts} />
          : "It looks like no one has posted anything yet." 
      }
    </div>
  );
}

Newsfeed.propTypes = {
  auth: PropTypes.object.isRequired,
  posts: PropTypes.array.isRequired,
  getPosts: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    posts: state.posts
  };
};

export default connect(mapStateToProps, { getPosts })(Newsfeed);
